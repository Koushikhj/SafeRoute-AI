
export const sendMockSMS = async ({ to, message }) => {
  try {
    // Validate required information
    if (!to || !message) {
      throw new Error("Recipient phone and message are required");
    }

    // Simulate SMS provider processing
    console.log("--------------------------------");
    console.log("MOCK SMS SERVICE");
    console.log("Recipient:", to);
    console.log("Message:", message);
    console.log("Status: SIMULATED");
    console.log("--------------------------------");

    // Return a simulated provider response
    return {
      success: true,
      simulated: true,
      providerMessageId: `MOCK-${Date.now()}`,
      message: "Mock SMS processed successfully. No real SMS was sent.",
    };
  } catch (error) {
    console.error("Mock SMS Error:", error);

    return {
      success: false,
      simulated: true,
      providerMessageId: null,
      message: error.message,
    };
  }
};
