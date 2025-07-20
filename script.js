document.addEventListener('DOMContentLoaded', () => {
    // --- Utility Functions to Simulate API Calls ---
    const simulateApiCall = (data, delay = 1500) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, delay);
        });
    };

    // --- File Upload & Analysis ---
    const fileUploadInput = document.getElementById('file-upload-input');
    const selectedFileName = document.getElementById('selected-file-name');
    const filePreview = document.getElementById('file-preview');
    const analysisOutput = document.getElementById('analysis-output');

    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                selectedFileName.textContent = `Selected file: ${file.name}`;
                analysisOutput.textContent = 'Analyzing...';
                filePreview.innerHTML = ''; // Clear previous preview

                const reader = new FileReader();
                reader.onload = async (e) => {
                    const content = e.target?.result;
                    
                    // Display preview
                    if (file.type.startsWith('image/')) {
                        filePreview.innerHTML = `<img src="${content as string}" alt="Uploaded Preview">`;
                    } else {
                        filePreview.innerHTML = `

pre
`; }

                // Simulate API call for AI analysis
                let simulatedResult = '';
                if (file.type.startsWith('image/')) {
                    simulatedResult = `AI Image Analysis (via Backend API):
Detected Objects: [Tree, Sky, Building, Car]

Scene Description: A bustling city street with modern architecture under a clear sky.

Dominant Colors: Blue, Grey, Green.

Confidence Score: 0.92
;                   } else if (file.type === 'application/pdf') {                       simulatedResult = 
AI PDF Analysis (via Backend API):

Document Title: ${file.name}

Key Topics: [AI, Machine Learning, Data Privacy, Future Trends]

Summary: This PDF discusses advancements in AI, focusing on ethical considerations and future applications in various industries.

Page Count: 15
;                   } else if (file.type.startsWith('text/') || file.type === 'application/json' || file.type === 'application/xml') {                       simulatedResult = 
AI Text Analysis (via Backend API):

Document Type: ${file.type.split('/')[1] || 'Text'}

Word Count: ${content ? (content as string).split(/\s+/).length : 0}

Sentiment: Neutral to Positive

Entities: [EpicTech, AI, Portals]
;                   } else {                       simulatedResult = 
AI File Analysis (via Backend API):

File Type: "${file.type}"

Status: Ready for specialized processing.`; }

              const result = await simulateApiCall(simulatedResult, 2000);
              analysisOutput.textContent = result as string;
          };

          if (file.type.startsWith('image/')) {
              reader.readAsDataURL(file);
          } else {
              reader.readAsText(file);
          }
      } else {
          selectedFileName.textContent = '';
          filePreview.innerHTML = '';
          analysisOutput.textContent = '';
      }
  });
}

// --- Multi-modal AI Capabilities --- const imageUploadMMInput = document.getElementById('image-upload-mm-input'); const selectedImageMMName = document.getElementById('selected-image-mm-name'); const imageDescriptionMMOutput = document.getElementById('image-description-mm-output'); const storyPromptInput = document.getElementById('story-prompt-input') as HTMLTextAreaElement;

if (imageUploadMMInput) { imageUploadMMInput.addEventListener('change', async (event) => { const file = (event.target as HTMLInputElement).files?.[0]; if (file) { selectedImageMMName.textContent = Selected: ${file.name}; imageDescriptionMMOutput.textContent = 'AI Vision: Analyzing image...';

          const reader = new FileReader();
          reader.onload = async (e) => {
              // Simulate API call for AI vision analysis
              const description = await simulateApiCall(`AI Vision API (via Backend): This image (${file.name}) depicts a futuristic cityscape at sunset, with neon lights and flying vehicles. The atmosphere is serene yet technologically advanced.`, 2500);
              imageDescriptionMMOutput.textContent = description as string;
              // Append description to story prompt
              storyPromptInput.value = storyPromptInput.value ? `${storyPromptInput.value}\n\n${description}` : description as string;
          };
          reader.readAsDataURL(file);
      } else {
          selectedImageMMName.textContent = '';
          imageDescriptionMMOutput.textContent = '';
      }
  });
}

const toggleRecordingBtn = document.getElementById('toggle-recording-btn'); const voiceTranscriptOutput = document.getElementById('voice-transcript-output'); let isRecording = false; let mediaRecorder: MediaRecorder | null = null; let audioChunks: Blob[] = [];

// Check for browser support for Web Speech API const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; const SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList; const SpeechRecognitionEvent = (window as any).SpeechRecognitionEvent || (window as any).webkitSpeechRecognitionEvent;

if (toggleRecordingBtn) { toggleRecordingBtn.addEventListener('click', async () => { if (!SpeechRecognition) { voiceTranscriptOutput.textContent = 'Web Speech API not supported in this browser. Simulating voice input.'; // Fallback to simulation if API not supported isRecording = !isRecording; if (isRecording) { toggleRecordingBtn.textContent = 'Stop Recording'; voiceTranscriptOutput.textContent = 'Simulating recording... Speak now!'; setTimeout(() => { voiceTranscriptOutput.textContent = 'AI Transcript (Simulated): "Hello, how can I assist you today? This is a simulated voice input."'; isRecording = false; toggleRecordingBtn.textContent = 'Start Recording'; }, 3000); } else { toggleRecordingBtn.textContent = 'Start Recording'; voiceTranscriptOutput.textContent = ''; } return; }

      if (!isRecording) {
          // Start recording
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              mediaRecorder = new MediaRecorder(stream);
              audioChunks = [];

              mediaRecorder.ondataavailable = (event) => {
                  audioChunks.push(event.data);
              };

              mediaRecorder.onstop = async () => {
                  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                  // In a real app, send audioBlob to backend for transcription
                  voiceTranscriptOutput.textContent = 'Sending audio to AI for transcription...';
                  const transcript = await simulateApiCall('AI Transcript (via Backend API): "User said: The quick brown fox jumps over the lazy dog. How can AI help me today?"', 3000);
                  voiceTranscriptOutput.textContent = transcript as string;
                  stream.getTracks().forEach(track => track.stop()); // Stop microphone access
                  isRecording = false;
                  toggleRecordingBtn.textContent = 'Start Recording';
              };

              mediaRecorder.start();
              isRecording = true;
              toggleRecordingBtn.textContent = 'Stop Recording';
              voiceTranscriptOutput.textContent = 'Recording... Speak now!';
          } catch (err) {
              console.error('Error accessing microphone:', err);
              voiceTranscriptOutput.textContent = 'Error accessing microphone. Please ensure permissions are granted.';
              isRecording = false;
              toggleRecordingBtn.textContent = 'Start Recording';
          }
      } else {
          // Stop recording
          if (mediaRecorder && mediaRecorder.state === 'recording') {
              mediaRecorder.stop();
          }
      }
  });
}

// --- Specialized AI Functions --- const generateStoryBtn = document.getElementById('generate-story-btn'); const generatedStoryOutput = document.getElementById('generated-story-output');

if (generateStoryBtn) { generateStoryBtn.addEventListener('click', async () => { const prompt = storyPromptInput.value; if (!prompt) { generatedStoryOutput.textContent = 'Please enter a prompt or upload an image for story generation.'; return; }

      generateStoryBtn.textContent = 'Generating...';
      (generateStoryBtn as HTMLButtonElement).disabled = true;
      generatedStoryOutput.textContent = 'AI is crafting your story...';

      // Simulate API call for story generation
      const story = await simulateApiCall(`AI Story API (via Backend): Based on your prompt: "${prompt}", the AI has generated a captivating narrative: "In a realm where whispers of ancient code echoed through digital forests, a lone byte embarked on a quest. It sought the legendary 'Source of Infinite Knowledge', a myth whispered among the data streams. Its journey led it through firewalls of forgotten algorithms and across rivers of flowing data, until it finally reached a nexus of pure information. There, it found not a source, but a mirror, reflecting its own potential. The byte realized, the knowledge was always within, waiting to be unlocked by curiosity and courage."`, 3500);
      
      generatedStoryOutput.textContent = story as string;
      generateStoryBtn.textContent = 'Generate Story';
      (generateStoryBtn as HTMLButtonElement).disabled = false;
  });
}

});
