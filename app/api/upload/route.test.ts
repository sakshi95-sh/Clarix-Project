import { describe, it, vi,expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from './route';
import { generateResponse } from "@/app/lib/ai";
import { uploadFile } from "@/app/lib/s3";
import { extractTextFromPDF } from "@/app/lib/pdfService";
import { getOrCreateChat } from "@/app/lib/chatIdCreation";
import { saveMessage } from "@/app/lib/messages";



vi.mock("@/app/lib/ai", () => ({
  generateResponse: vi.fn(),
}))

vi.mock("@/app/lib/s3", () => ({
  uploadFile:vi.fn(),
}))

vi.mock('@/app/lib/chatIdCreation', () => ({
  getOrCreateChat: vi.fn(),
  }))
  
vi.mock('@/app/lib/messages', () => ({
    saveMessage:vi.fn(),
}))
vi.mock('@/app/lib/pdfService', () => ({
    extractTextFromPDF:vi.fn(),
}))
const createfakeStrem = (text: string) => {
  
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text))
      controller.close();
    }
  })

}

  const fakeFile = new File(
      ["fake PDF content"],
      "sample.pdf",
      {type:"application/pdf"}
  )



describe("Upload Testing", () => {
  let formData: FormData;

beforeEach(() => {
  formData = new FormData();
  vi.clearAllMocks();
});
  
  
  
  it("returns 400 when PDF file is missing", async () => {
    formData.append("message", "Summarize this pdf")
    
  

      const request = new NextRequest("http://localhost/api/upload", {
      method: 'POST',
      body: formData
    })

      const response = await POST(request);

    const result = await response.json();
    expect(result.error).toBe("No file provided");
    expect(response.status).toBe(400);

  })
  
  it("returns 200 when PDF file is missing", async () => {

    vi.mocked(generateResponse).mockResolvedValue(createfakeStrem("AI Response"));

    vi.mocked(uploadFile).mockResolvedValue({
      url: "https://example.com/sample.pdf",
      key: "sample.pdf",
    });

    vi.mocked(extractTextFromPDF).mockResolvedValue({
      text: "Extracted PDF text",
      totalPages: 1,
    })

    formData.append('file', fakeFile)
  const request = new NextRequest("http://localhost/api/upload", {
      method: 'POST',
      body: formData
  })
  const response = await POST(request);

    const result = await response.text();
    expect(result).toBe("AI Response");
    expect(response.status).toBe(200);
  expect(extractTextFromPDF).toHaveBeenCalledWith(
      expect.any(Uint8Array),
  );
    
    expect(uploadFile).toHaveBeenCalledTimes(1);
    expect(getOrCreateChat).not.toHaveBeenCalled();
   expect(saveMessage).not.toHaveBeenCalled();
  })

  it('Logged-in user uploads a PDF, New Chat and the message is saved.', async() => {

    vi.mocked(generateResponse).mockResolvedValue(createfakeStrem("AI Response"));
    vi.mocked(uploadFile).mockResolvedValue({
      url: "https://example.com/sample.pdf",
      key: "sample.pdf",
    });
    vi.mocked(extractTextFromPDF).mockResolvedValue({
      text: "Extracted PDF text",
      totalPages: 1,
    })
    formData.append('file', fakeFile)
    formData.append("message", "Summarize this PDF");
vi.mocked(getOrCreateChat).mockResolvedValue("chat-1234");

  const request = new NextRequest("http://localhost/api/upload", {
    method: 'POST',
    headers: {
        "x-user-id": "user-1234",

      },
      body: formData
  })
  const response = await POST(request);

    const result = await response.text();
    expect(result).toBe("AI Response");
     expect(response.status).toBe(200);
  expect(extractTextFromPDF).toHaveBeenCalledWith(
      expect.any(Uint8Array),
  );
 expect(uploadFile).toHaveBeenCalledTimes(1);
    expect(getOrCreateChat).toHaveBeenCalled();
    expect(saveMessage).toHaveBeenCalledWith({
  chatId: "chat-1234",
  content: "Summarize this PDF",
  role: "user",
  fileUrl: "https://example.com/sample.pdf",
  fileType: "application/pdf",
});
  })

  it("Logged-in user uploads a PDF, with no previously saved chat", async () => {
    



  })


 it("returns 500 when the chat ID is invalid", async () => {
  vi.mocked(uploadFile).mockResolvedValue({
    url: "https://example.com/sample.pdf",
    key: "sample.pdf",
  });

  vi.mocked(extractTextFromPDF).mockResolvedValue({
    text: "Extracted PDF text",
    totalPages: 1,
  });

  vi.mocked(getOrCreateChat).mockRejectedValue(
    new Error("Chat not found or unauthorized"),
  );

  formData.append("file", fakeFile);
  formData.append("message", "Summarize this PDF");
  formData.append("chatId", "invalid-chat");

  const request = new NextRequest("http://localhost/api/upload", {
    method: "POST",
    headers: {
      "x-user-id": "user-1234",
    },
    body: formData,
  });

  const response = await POST(request);
  const result = await response.json();

  expect(response.status).toBe(500);

  expect(result).toEqual({
    error: "Failed to process chat",
  });

  expect(getOrCreateChat).toHaveBeenCalledWith(
    "invalid-chat",
    "user-1234",
  );

  expect(saveMessage).not.toHaveBeenCalled();
  expect(generateResponse).not.toHaveBeenCalled();
});
  it('AI failed to response', async () => {
    vi.mocked(generateResponse).mockRejectedValueOnce(
      new Error("AI service unavailable"))
    vi.mocked(uploadFile).mockResolvedValue({
      url: "https://example.com/sample.pdf",
      key: "sample.pdf",
    });
    vi.mocked(extractTextFromPDF).mockResolvedValue({
      text: "Extracted PDF text",
      totalPages: 1,
    })
    formData.append('file', fakeFile)
    formData.append("chatId", "chat-1234");
    formData.append("message", "Summarize this PDF");
vi.mocked(getOrCreateChat).mockResolvedValue("chat-1234");

  const request = new NextRequest("http://localhost/api/upload", {
    method: 'POST',
    headers: {
        "x-user-id": "user-1234",

      },
      body: formData
  })
  const response = await POST(request);

    const result = await response.json();
    expect(response.status).toBe(500);
    expect(result).toEqual({
      error:"Failed to process chat",
    })
  })
})