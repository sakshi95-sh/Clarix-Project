import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function ChatMessages({ hasMessage, message }: { hasMessage: boolean; message: { content: string; role: 'user' | 'AI' }[]     }) {
    return (        
        <div className="flex flex-col flex-1  overflow-hidden">
            {hasMessage
            ? <div className="flex-1 flex flex-col overflow-y-auto">
              {message.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full flex-row p-3 ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}>
                  <div className="flex flex-col gap-1">
                    {msg.role === "user" &&
                      <>
                        <h1 className=" justify-start text-gray-800 text-sm font-medium tracking-[2px]">{msg.role}</h1>
                        <div className=" bg-[#534ab7] text-white text-xs  tracking-wide p-2 rounded-lg whitespace-pre-wrap">{msg.content}</div>
                      </>}
                    {msg.role === "AI" &&
                      <>
                        <h1 className="text-gray-800 text-sm font-medium tracking-[2px]">{msg.role}</h1>
                        <div className=" border-2 border-[#534ab7] bg-white text-[#534ab7]  text-xs  tracking-wide p-2  rounded-lg max-w-[70%] leading-[2]">
                        <div className="    prose prose-headings:font-bold prose-headings:font-bold prose-sm max-w-none prose-black
    prose-table:w-full prose-table:border prose-table:border-collapse
    prose-th:border prose-td:border
    prose-th:px-3 prose-th:py-2
    prose-td:px-3 prose-td:py-2
    prose-th:bg-gray-100
    prose-td:align-top prose-th:text-left">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                        </div>
                        </div>
                      </>
                    }
                  </div>
                </div>
              ))}
            </div>
            :

            <div className="main-chat-page flex flex-1 flex-col px-50 tracking-[2px] leading-[1.2] gap-10 overflow-hidden">

              <h1 className="
       text-xl font-medium tracking-[2px]
        px-20 mt-20
        text-center
        text-[#534ab7]
        leading-[1.2]
        ">What would you like to analyze?</h1>
              <h1 className="text-xl text-center text-black-500 leading-relaxed">
                Upload a document, image, or audio file — or just type a question to get started.
              </h1>


            </div>
          }
        </div>
    );
}