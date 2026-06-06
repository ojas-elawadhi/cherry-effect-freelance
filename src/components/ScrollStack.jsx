import { Children, useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className="scroll-stack-card relative w-full"
    style={{ backfaceVisibility: 'hidden' }}>
    <div
      className={`scroll-stack-card__content relative h-80 w-full rounded-[40px] p-12 shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}>
      {children}
    </div>
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  header = null,
  headerClassName = '',
  entryOffset = '0%',
  entranceScale = 1,
  peakPosition = 0.5,
  outro = null,
  outroClassName = '',
  behind = null,
  onActiveIndexChange,
  onStackComplete
}) => {
  const childItems = Children.toArray(children);
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);
  const stageRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const outroRef = useRef(null);
  const outroLeftRef = useRef(null);
  const outroRightRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const activeIndexRef = useRef(-1);
  const lastOutroProgressRef = useRef(-1);
  const lenisAnimationFrameRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const windowLayoutRef = useRef({
    baseTops: [],
    cardHeights: [],
    targetTops: [],
    innerTop: 0
  });
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(element => {
    let offsetTop = 0;
    let currentElement = element;

    while (currentElement) {
      offsetTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent;
    }

    return offsetTop;
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    if (useWindowScroll) {
      const { baseTops, cardHeights, targetTops, innerTop, outroStart, outroEnd } = windowLayoutRef.current;
      const localScroll = Math.max(0, scrollTop - innerTop);

      // Outro: ONE continuous pinned sequence. Cards fade out -> headline fades
      // in (doors closed) -> holds -> doors split apart revealing `behind`.
      if (outro && outroRef.current && outroEnd > outroStart) {
        const outroProgress = Math.min(1, Math.max(0, (localScroll - outroStart) / (outroEnd - outroStart)));
        if (Math.abs(outroProgress - lastOutroProgressRef.current) > 0.004) {
          lastOutroProgressRef.current = outroProgress;

          // Phase 1 (0 -> 0.28): cards fade fully out.
          const stackOpacity = 1 - Math.min(1, outroProgress / 0.28);

          // Phase 2 (0.30 -> 0.50): headline text fades + rises in.
          const textIn = Math.min(1, Math.max(0, (outroProgress - 0.3) / 0.2));
          const textEased = 1 - Math.pow(1 - textIn, 3);

          // Phase 3 (0.62 -> 1.0): doors split apart.
          const partRaw = Math.min(1, Math.max(0, (outroProgress - 0.62) / 0.38));
          const part = partRaw < 0.5
            ? 2 * partRaw * partRaw
            : 1 - Math.pow(-2 * partRaw + 2, 2) / 2;
          const offset = part * 100; // % of each door's own width

          if (cardsWrapperRef.current) {
            cardsWrapperRef.current.style.opacity = `${stackOpacity}`;
            cardsWrapperRef.current.style.pointerEvents = stackOpacity < 0.05 ? 'none' : '';
          }

          const rise = (1 - textEased) * 36;
          if (outroLeftRef.current) {
            outroLeftRef.current.style.transform = `translate3d(-${offset}%, 0, 0)`;
            const t = outroLeftRef.current.querySelector('.scroll-stack-door__inner');
            if (t) {
              t.style.opacity = `${textEased}`;
              t.style.transform = `translate3d(0, ${rise}px, 0)`;
            }
          }
          if (outroRightRef.current) {
            outroRightRef.current.style.transform = `translate3d(${offset}%, 0, 0)`;
            const t = outroRightRef.current.querySelector('.scroll-stack-door__inner');
            if (t) {
              t.style.opacity = `${textEased}`;
              t.style.transform = `translate3d(0, ${rise}px, 0)`;
            }
          }

          // Doors are inert until the headline starts showing; fully gone when open.
          outroRef.current.style.pointerEvents = 'none';
          outroRef.current.style.visibility = textIn > 0 ? 'visible' : 'hidden';
        }
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardContent = card.querySelector('.scroll-stack-card__content');
        if (!cardContent) return;

        const baseTop = baseTops[i] ?? stackPositionPx;
        const targetTop = targetTops[i] ?? (stackPositionPx + itemStackDistance * i);
        const travelDistance = Math.max(0, baseTop - targetTop);
        const currentTop = travelDistance
          ? Math.max(baseTop - localScroll, targetTop)
          : targetTop;
        const scaleProgress = travelDistance
          ? Math.min(1, Math.max(0, (baseTop - currentTop) / travelDistance))
          : 1;
        const targetScale = baseScale + i * itemScale;
        let scale;
        if (entranceScale > 1) {
          // Two-phase scale: grow from 1 -> entranceScale across most of the
          // travel (up to peakPosition), then shrink entranceScale -> targetScale
          // over the short final stretch. The shrink is eased (accelerating) so
          // the card snaps down quickly as it pins for a punchy, impactful feel.
          const peak = Math.min(0.999, Math.max(0.001, peakPosition));
          if (scaleProgress <= peak) {
            const t = scaleProgress / peak;
            scale = 1 + t * (entranceScale - 1);
          } else {
            const t = (scaleProgress - peak) / (1 - peak);
            const eased = t * t; // ease-in: slow then fast shrink
            scale = entranceScale - eased * (entranceScale - targetScale);
          }
        } else {
          scale = 1 - scaleProgress * (1 - targetScale);
        }
        const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

        let blur = 0;
        if (blurAmount) {
          const topCardIndex = targetTops.reduce((highestIndex, top, index) => {
            const cardCurrentTop = Math.max(baseTops[index] - localScroll, targetTops[index]);
            return cardCurrentTop <= top + 0.5 ? index : highestIndex;
          }, 0);

          if (i < topCardIndex) {
            blur = Math.max(0, (topCardIndex - i) * blurAmount);
          }
        }

        const newTransform = {
          translateY: Math.round(currentTop * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100
        };

        const lastTransform = lastTransformsRef.current.get(i);
        const hasChanged =
          !lastTransform ||
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
          Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
          Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

        if (hasChanged) {
          card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0)`;
          cardContent.style.transform = `translateZ(0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
          cardContent.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
          lastTransformsRef.current.set(i, newTransform);
        }
      });

      if (onActiveIndexChange) {
        let activeIndex = -1;
        cardsRef.current.forEach((_, index) => {
          const cardCurrentTop = Math.max(
            (baseTops[index] ?? 0) - localScroll,
            targetTops[index] ?? 0
          );
          if (cardCurrentTop <= (targetTops[index] ?? 0) + 0.5) {
            activeIndex = index;
          }
        });
        if (activeIndex !== activeIndexRef.current) {
          activeIndexRef.current = activeIndex;
          onActiveIndexChange(activeIndex);
        }
      }

      const lastIndex = cardsRef.current.length - 1;
      if (lastIndex >= 0) {
        const lastBaseTop = baseTops[lastIndex] ?? 0;
        const lastTargetTop = targetTops[lastIndex] ?? 0;
        const lastCurrentTop = Math.max(lastBaseTop - localScroll, lastTargetTop);
        const isStacked = lastCurrentTop <= lastTargetTop + 0.5;

        if (isStacked && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isStacked && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }

      isUpdatingRef.current = false;
      return;
    }

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;
    const cardTops = cardsRef.current.map(card => getElementOffset(card));
    const triggerStarts = cardTops.map((cardTop, index) => (
      cardTop - stackPositionPx - itemStackDistance * index
    ));
    const pinEnd = endElementTop - containerHeight / 2;

    let topCardIndex = 0;
    if (blurAmount) {
      for (let j = 0; j < triggerStarts.length; j++) {
        if (scrollTop >= triggerStarts[j]) {
          topCardIndex = j;
        }
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardContent = card.querySelector('.scroll-stack-card__content');
      if (!cardContent) return;

      const cardTop = cardTops[i];
      const triggerStart = triggerStarts[i];
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (!useWindowScroll) {
        if (isPinned) {
          translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
        }
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const wrapperTransform = `translate3d(0, ${newTransform.translateY}px, 0)`;
        const contentTransform = `translateZ(0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = wrapperTransform;
        cardContent.style.transform = contentTransform;
        cardContent.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    entranceScale,
    peakPosition,
    outro,
    onActiveIndexChange,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current) return;

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      return null;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        lenisAnimationFrameRef.current = requestAnimationFrame(raf);
      };
      lenisAnimationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(useWindowScroll
      ? stageRef.current?.querySelectorAll('.scroll-stack-card') ?? []
      : scroller.querySelectorAll('.scroll-stack-card'));

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      const cardContent = card.querySelector('.scroll-stack-card__content');
      if (useWindowScroll) {
        card.style.position = 'absolute';
        card.style.insetInline = '0px';
        card.style.top = '0px';
        card.style.margin = '0px';
        card.style.willChange = 'transform';
        card.style.transform = 'translate3d(0, 0, 0)';
        card.style.webkitTransform = 'translate3d(0, 0, 0)';
      } else {
        if (i < cards.length - 1) {
          card.style.marginBottom = `${itemDistance}px`;
        }
        card.style.position = 'relative';
        card.style.top = 'auto';
        card.style.willChange = 'transform';
        card.style.transform = 'translateZ(0)';
        card.style.webkitTransform = 'translateZ(0)';
      }
      card.style.zIndex = `${i + 1}`;
      card.style.backfaceVisibility = 'hidden';
      if (!cardContent) return;
      cardContent.style.willChange = 'transform, filter';
      cardContent.style.transformOrigin = 'top center';
      cardContent.style.backfaceVisibility = 'hidden';
      cardContent.style.transform = 'translateZ(0)';
      cardContent.style.webkitTransform = 'translateZ(0)';
      cardContent.style.perspective = '1000px';
      cardContent.style.webkitPerspective = '1000px';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    if (useWindowScroll) {
      const inner = innerRef.current;
      const stage = stageRef.current;
      if (!inner || !stage) return;

      const stackPositionPx = parsePercentage(stackPosition, window.innerHeight);
      const entryOffsetPx = parsePercentage(entryOffset, window.innerHeight);
      const cardHeights = cards.map(card => card.offsetHeight);
      const baseTops = [];
      const targetTops = [];
      // Start the first card `entryOffsetPx` below its pinned position so the
      // header pins first and the cards only travel into view as scroll continues.
      let runningTop = stackPositionPx + entryOffsetPx;

      cardHeights.forEach((cardHeight, index) => {
        baseTops.push(runningTop);
        targetTops.push(stackPositionPx + itemStackDistance * index);
        runningTop += cardHeight + itemDistance;
      });

      const lastCardHeight = cardHeights.at(-1) ?? 0;
      const totalCardHeight = baseTops.at(-1) ?? stackPositionPx;
      const releaseBuffer = window.innerHeight;
      // When an outro is present, the last card finishes pinning once
      // localScroll passes its travel distance. We then hold the completed
      // stack for `outroDelay` of extra scroll (so the last card visibly
      // settles and the user scrolls a little) BEFORE the crossfade begins.
      const lastTravel = Math.max(0, (baseTops.at(-1) ?? 0) - (targetTops.at(-1) ?? 0));
      const outroDelay = outro ? window.innerHeight * 0.5 : 0;
      // Outro window holds the full sequence: cards fade -> headline in -> hold
      // -> doors split. Needs ~2.2 viewports of scroll to feel deliberate.
      const outroWindow = outro ? window.innerHeight * 2.2 : releaseBuffer * 0.6;
      const outroStart = lastTravel + outroDelay;
      const outroEnd = outroStart + outroWindow;

      windowLayoutRef.current = {
        baseTops,
        cardHeights,
        targetTops,
        innerTop: getElementOffset(inner),
        outroStart,
        outroEnd
      };

      stage.style.height = '100vh';
      if (outro) {
        // Pin the stage exactly until the doors finish splitting. The stage
        // (100vh) un-pins when localScroll === innerHeight - 100vh; we make that
        // equal outroEnd so the doors are fully open right as the pin releases
        // and the revealed section below scrolls up into the opening gap.
        inner.style.height = `${outroEnd + window.innerHeight}px`;
      } else {
        inner.style.height = `${totalCardHeight + lastCardHeight + releaseBuffer}px`;
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      if (useWindowScroll) {
        const inner = innerRef.current;
        if (inner) {
          windowLayoutRef.current.innerTop = getElementOffset(inner);
        }
      }
      handleScroll();
    });

    resizeObserver.observe(scroller);
    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
    }
    cards.forEach(card => resizeObserver.observe(card));

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
      window.addEventListener('load', handleScroll);
    } else {
      setupLenis();
    }

    updateCardTransforms();

    return () => {
      resizeObserver.disconnect();
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
      if (lenisAnimationFrameRef.current) {
        cancelAnimationFrame(lenisAnimationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        window.removeEventListener('load', handleScroll);
      }
      stackCompletedRef.current = false;
      activeIndexRef.current = -1;
      lastOutroProgressRef.current = -1;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      lenisRef.current = null;
      lenisAnimationFrameRef.current = null;
      scrollFrameRef.current = null;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    entryOffset,
    outro,
    onStackComplete,
    handleScroll,
    getElementOffset,
    parsePercentage,
    setupLenis,
    updateCardTransforms
  ]);

  // Container styles based on scroll mode
  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: 'contain'
      }
    : {
        // Container scroll mode - original behavior
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  if (useWindowScroll) {
    return (
      <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
        <div className="scroll-stack-inner relative w-full" ref={innerRef}>
          <div className="scroll-stack-stage sticky top-0 z-[10] h-screen px-20 pointer-events-none" ref={stageRef}>
            <div
              className="scroll-stack-fade relative z-[40] h-full w-full"
              ref={cardsWrapperRef}
              style={{ transition: 'opacity 220ms ease-out' }}>
              {header ? (
                <div
                  className={`scroll-stack-header pointer-events-none absolute inset-x-0 top-0 z-[60] ${headerClassName}`.trim()}>
                  {header}
                </div>
              ) : null}
              <div className="relative mx-auto h-full w-full max-w-6xl">
                {childItems}
              </div>
            </div>

            {outro ? (
              <div
                className="scroll-stack-doors pointer-events-none absolute inset-0 z-[70] overflow-hidden"
                ref={outroRef}>
                <div className="scroll-stack-door scroll-stack-door--left" ref={outroLeftRef}>
                  <div className={`scroll-stack-door__inner ${outroClassName}`.trim()}>
                    {outro}
                  </div>
                </div>
                <div className="scroll-stack-door scroll-stack-door--right" ref={outroRightRef}>
                  <div className={`scroll-stack-door__inner ${outroClassName}`.trim()}>
                    {outro}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="scroll-stack-end absolute bottom-0 left-0 h-px w-full" />
        </div>

        {/* Revealed section, rendered ONCE. It is pulled up one viewport so it
            sits in the viewport BEHIND the pinned doors (which are opaque and
            cover it). As the doors split it is exposed in the widening gap; once
            the pin releases it is already in place and scrolls on normally — same
            element throughout, so no duplication and no handoff jump. */}
        {behind ? (
          <div className={`scroll-stack-behind relative ${outro ? 'scroll-stack-behind--pulled z-0' : ''}`.trim()}>
            {behind}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner min-h-screen px-20 pt-[20vh] pb-[50rem]">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
