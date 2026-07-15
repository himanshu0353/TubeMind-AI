// import { useEffect, useState } from "react";
// // import { MessageTypes, type TranscriptResponse, } from "../../shared/messages";


// export function useTranscript() {
//     const [transcript, setTranscript] = useState("");

//     useEffect(() => {
//         async function loadTranscript(){
//             try{ 
//                 const response = await chrome.runtime.sendMessage<
//                 { type: MessageTypes.GET_TRANSCRIPT },
//                 TranscriptResponse
//                 >({
//                     // type: MessageTypes.GET_TRANSCRIPT,
//                 });

//                 setTranscript(response.transcript);
//             }catch(error){
//                 console.error(error);
//             }
//         }
//         loadTranscript();
//     }, []);

//     return transcript;
// }