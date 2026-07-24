

// function sleep(ms:number): Promise<void>{
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function openTranscriptPanel(): Promise<void> {
//     const existingTranscript = document.querySelector(
//     'ytd-transcript-segment-list-renderer'
//     );

//     if(existingTranscript){
//         return;
//     }

//     const transcriptButton = Array.from(
//         document.querySelectorAll('button')
//     ).find((button)=>{
//         button.textContent?.trim().includes('show transcript')
//     });

//     if (!transcriptButton){
//         throw new Error('Transcript is not avaiable for this video');
//     }

//     transcriptButton.click();

//     await sleep(500);

//     await waitForElement('ytd-transcript-segment-list-render');
// }


// function waitForElement(
//     selector: string,
//     timeout = 5000
// ): Promise<Element>{
//     return new Promise((resolve, reject)=> {
//         const existing = document.querySelector(selector);

//         if(existing){
//             resolve(existing);
//             return;
//         }

//         const observer = new MutationObserver(() => {
//             const element = document.querySelector(selector);

//             if (element){
//                 observer.disconnect();
//                 resolve(element);
//             }
//         });

//         setTimeout(()=>{
//             observer.disconnect();
//             reject(new Error(`Element not found: ${selector}`));
//         }, timeout);
//     })
// }

// export async function getTranscript(): Promise<string>{
//     await openTranscriptPanel();

//     const transcriptContainer = await waitForElement(
//         'ytd-transcript-segment-list-renderer'
//     );

//     const segment = transcriptContainer.querySelectorAll(
//         'ytd-formatted-string.segment-text');

//     if(!segment.length){
//         throw new Error('Transcript is empty');
//     }

//     return Array.from(segment)
//             .map((segment) => segment.textContent?.trim()?? "")
//             .filter(Boolean)
//             .join(" ");
// } 