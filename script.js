document.addEventListener('DOMContentLoaded', () => {
    // --- File Upload & Analysis ---
    const fileUploadInput = document.getElementById('file-upload-input');
    const selectedFileName = document.getElementById('selected-file-name');
    const filePreview = document.getElementById('file-preview');
    const analysisOutput = document.getElementById('analysis-output');

    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                selectedFileName.textContent = `Selected file: ${file.name}`;
                analysisOutput.textContent = 'Analyzing...';

                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target?.result;
                    
                    // Display preview
                    if (file.type.startsWith('image/')) {
                        filePreview.innerHTML = `<img src="${content as string}" alt="Uploaded Preview">`;
                    } else {
                        filePreview.innerHTML = `

pre
`; }

                // Simulate AI analysis
                setTimeout(() => {
                    if (file.type.startsWith('image/')) {
                        analysisOutput.textContent = `Simulated Image Analysis: This image appears to contain a ${file.name.split('.')[0] || 'scene'}. It has a resolution of ${(file.size / 1024).toFixed(2)} KB. AI detects potential objects like [object1, object2].`;
                    } else if (file.type === 'application/pdf') {
                        analysisOutput.textContent = `Simulated PDF Analysis: This PDF document is named "${file.name}". It contains text and potentially images. AI can extract key phrases, summarize content, or identify entities. (Actual text extraction from PDF requires server-side processing or a library like pdf.js)`;
                    } else if (file.type.startsWith('text/') || file.type === 'application/json' || file.type === 'application/xml') {
                        analysisOutput.textContent = `Simulated Document Analysis: This text-based document is named "${file.name}". It contains ${content ? (content as string).length : 0} characters. AI can summarize, translate, or perform sentiment analysis on its content.`;
                    } else {
                        analysisOutput.textContent = `Simulated File Analysis: This file is of type "${file.type}". AI can potentially process it based on its content structure.`;
                    }
                }, 1500); // Simulate processing time
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

// --- Multi-modal AI Capabilities ---
const imageUploadMMInput = document.getElementById('image-upload-mm-input');
const selectedImageMMName = document.getElementById('selected-image-mm-name');
const imageDescriptionMMOutput = document.getElementById('image-description-mm-output');
const storyPromptInput = document.getElementById('story-prompt-input') as HTMLTextAreaElement;

if (imageUploadMMInput) {
    imageUploadMMInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            selectedImageMMName.textContent = `Selected: ${file.name}`;
            imageDescriptionMMOutput.textContent = 'AI Vision: Analyzing image...';

            const reader = new FileReader();
            reader.onload = (e) => {
                // Simulate AI vision analysis
                setTimeout(() => {
                    const description = `AI Vision: This image (${file.name}) depicts a vibrant scene with various elements. It could be a landscape, a portrait, or an abstract composition. AI identifies key features and potential emotions.`;
                    imageDescriptionMMOutput.textContent = description;
                    // Append description to story prompt
                    storyPromptInput.value = storyPromptInput.value ? `${storyPromptInput.value}\n\nImage Description: ${description}` : `Image Description: ${description}`;
                }, 2000);
            };
            reader.readAsDataURL(file);
        } else {
            selectedImageMMName.textContent = '';
            imageDescriptionMMOutput.textContent = '';
        }
    });
}

const toggleRecordingBtn = document.getElementById('toggle-recording-btn');
const voiceTranscriptOutput = document.getElementById('voice-transcript-output');
let isRecording = false;

if (toggleRecordingBtn) {
    toggleRecordingBtn.addEventListener('click', () => {
        isRecording = !isRecording;
        if (isRecording) {
            toggleRecordingBtn.textContent = 'Stop Recording';
            voiceTranscriptOutput.textContent = 'Simulating recording... Speak now!';
            setTimeout(() => {
                voiceTranscriptOutput.textContent = 'AI Transcript: "Hello, how can I assist you today? This is a simulated voice input."';
                isRecording = false; // Stop recording after simulated transcription
                toggleRecordingBtn.textContent = 'Start Recording';
            }, 3000); // Simulate transcription time
        } else {
            toggleRecordingBtn.textContent = 'Start Recording';
            voiceTranscriptOutput.textContent = '';
        }
    });
}

// --- Specialized AI Functions ---
const generateStoryBtn = document.getElementById('generate-story-btn');
const generatedStoryOutput = document.getElementById('generated-story-output');

if (generateStoryBtn) {
    generateStoryBtn.addEventListener('click', () => {
        const prompt = storyPromptInput.value;
        if (!prompt) {
            generatedStoryOutput.textContent = 'Please enter a prompt or upload an image for story generation.';
            return;
        }

        generateStoryBtn.textContent = 'Generating...';
        generateStoryBtn.disabled = true;
        generatedStoryOutput.textContent = 'AI is crafting your story...';

        setTimeout(() => {
            const story = `Based on your prompt: "${prompt}", the AI has generated the following story: "In a realm where whispers of ancient code echoed through digital forests, a lone byte embarked on a quest. It sought the legendary 'Source of Infinite Knowledge', a myth whispered among the data streams. Its journey led it through firewalls of forgotten algorithms and across rivers of flowing data, until it finally reached a nexus of pure information. There, it found not a source, but a mirror, reflecting its own potential. The byte realized, the knowledge was always within."`;
            generatedStoryOutput.textContent = story;
            generateStoryBtn.textContent = 'Generate Story';
            generateStoryBtn.disabled = false;
        }, 3000); // Simulate AI processing time
    });
}
});
