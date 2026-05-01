"use server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFields = {
  name: "",
  designation: "",
  company: "",
  phone: "",
  email: "",
  comments: "",
};

export async function submitAssessment(_, formData) {
  const fields = {
    name: String(formData.get("name") || "").trim(),
    designation: String(formData.get("designation") || "").trim(),
    company: String(formData.get("company") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    comments: String(formData.get("comments") || "").trim(),
  };

  if (
    !fields.name ||
    !fields.designation ||
    !fields.company ||
    !fields.phone ||
    !fields.email
  ) {
    return {
      status: "error",
      message: "Fill in the required details so we can assess your company properly.",
      fields,
    };
  }

  if (!emailPattern.test(fields.email)) {
    return {
      status: "error",
      message: "Add a valid email address and we will get back to you there.",
      fields,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    status: "success",
    message:
      "Assessment request received. We will reach out with the next steps shortly.",
    fields: initialFields,
  };
}
