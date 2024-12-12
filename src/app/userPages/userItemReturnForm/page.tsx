

// "use client";

// import { useState, useEffect } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { toast } from "react-toastify";

// // Declare SpeechRecognition globally
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }
// }

// // Define the shape of the form data
// interface ItemReturnFormData {
//   userId: string;
//   userName: string;
//   equipmentId: string;
//   equipmentName: string;
//   condition: string;
//   notes: string;
// }

// const ItemReturnForm = () => {
//   // State to manage form data
//   const [itemReturnFormData, setItemReturnFormData] = useState<ItemReturnFormData>({
//     userId: "",
//     userName: "",
//     equipmentId: "",
//     equipmentName: "",
//     condition: "",
//     notes: "",
//   });

//   // State to track currently active field for speech input
//   const [listeningField, setListeningField] = useState<string | null>(null);

//   // State to check browser support for speech recognition
//   const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

//   useEffect(() => {
//     // Check if the browser supports SpeechRecognition
//     if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
//       setIsSpeechRecognitionSupported(true);
//     } else {
//       setIsSpeechRecognitionSupported(false);
//     }
//   }, []);

//   // Start speech recognition for a specific field
//   const startSpeechRecognition = (field: string) => {
//     if (!isSpeechRecognitionSupported) {
//       toast.error("Speech recognition not supported in this browser.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setListeningField(field);
//       toast.info("Listening...", { position: "top-right", autoClose: 2000 });
//     };

//     recognition.onresult = (event: any) => {
//       const spokenText = event.results[0][0].transcript;
//       setItemReturnFormData((prev) => ({
//         ...prev,
//         [field]: spokenText,
//       }));
//       toast.success(`Captured: ${spokenText}`, { position: "top-right", autoClose: 3000 });
//     };

//     recognition.onerror = (event: any) => {
//       console.error("Speech recognition error:", event.error);
//       toast.error("Error during speech recognition.", { position: "top-right", autoClose: 3000 });
//     };

//     recognition.onend = () => {
//       setListeningField(null);
//     };

//     recognition.start();
//   };

//   // Read label content aloud in the specified language
//   const readLabelContent = (label: string, lang: "en" | "hi") => {
//     const utterance = new SpeechSynthesisUtterance();

//     // Set the language based on the lang parameter
//     if (lang === "hi") {
//       utterance.lang = "hi-IN";
//       utterance.text = label; // Ensure Hindi text is passed correctly
//     } else {
//       utterance.lang = "en-US";
//       utterance.text = label;
//     }

//     speechSynthesis.speak(utterance);

//     toast.info(`Reading label: ${label}`, { position: "top-right", autoClose: 3000 });
//   };

//   // Handle form field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setItemReturnFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/inventory/return/user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(itemReturnFormData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!", { position: "top-right", autoClose: 3000 });
//         setItemReturnFormData({
//           userId: "",
//           userName: "",
//           equipmentId: "",
//           equipmentName: "",
//           condition: "",
//           notes: "",
//         });
//       } else {
//         const errorData = await response.json();
//         toast.error(`Error: ${errorData.message}`, { position: "top-right", autoClose: 3000 });
//       }
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       toast.error("Failed to submit the form.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   return (
//     <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
//       <Breadcrumb pageName="ITEM RETURN FORM" />
//       <div className="flex flex-col gap-9">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
//               {[
//                 { name: "userId", label: "उपयोगकर्ता पहचान" }, // Hindi label for "User ID"
//                 { name: "userName", label: "उपयोगकर्ता नाम" }, // Hindi label for "User Name"
//                 { name: "equipmentId", label: "उपकरण पहचान" }, // Hindi label for "Equipment ID"
//                 { name: "equipmentName", label: "उपकरण नाम" }, // Hindi label for "Equipment Name"
//                 { name: "condition", label: "स्थिति" }, // Hindi label for "Condition"
//                 { name: "notes", label: "टिप्पणियाँ" }, // Hindi label for "Notes"
//               ].map(({ name, label }) => (
//                 <div key={name}>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     {label} <span className="text-meta-1">*</span>
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type={name === "notes" ? "textarea" : "text"}
//                       name={name}
//                       value={itemReturnFormData[name as keyof ItemReturnFormData]}
//                       onChange={handleChange}
//                       required
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                     />
//                     {isSpeechRecognitionSupported && (
//                       <>
//                         <button
//                           type="button"
//                           onClick={() => readLabelContent(label, "hi")}
//                           className="ml-3 rounded bg-secondary p-2 text-white"
//                         >
//                              🔊 हिंदी
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => startSpeechRecognition(name)}
//                           className={`ml-3 rounded bg-primary p-2 text-white ${
//                             listeningField === name ? "animate-pulse" : ""
//                           }`}
//                         >
//                           🎤
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <div className="col-span-full flex justify-end">
//                 <button
//                   type="submit"
//                   className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
//                 >
//                   Submit Return
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemReturnForm;
// "use client";

// import { useState, useEffect } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { toast } from "react-toastify";

// // Declare SpeechRecognition globally
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }
// }

// // Define the shape of the form data
// interface ItemReturnFormData {
//   userId: string;
//   userName: string;
//   equipmentId: string;
//   equipmentName: string;
//   condition: string;
//   notes: string;
// }

// const ItemReturnForm = () => {
//   // State to manage form data
//   const [itemReturnFormData, setItemReturnFormData] = useState<ItemReturnFormData>({
//     userId: "",
//     userName: "",
//     equipmentId: "",
//     equipmentName: "",
//     condition: "",
//     notes: "",
//   });

//   // State to track currently active field for speech input
//   const [listeningField, setListeningField] = useState<string | null>(null);

//   // State to check browser support for speech recognition
//   const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

//   useEffect(() => {
//     // Check if the browser supports SpeechRecognition
//     if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
//       setIsSpeechRecognitionSupported(true);
//     } else {
//       setIsSpeechRecognitionSupported(false);
//     }
//   }, []);

//   // Start speech recognition for a specific field
//   const startSpeechRecognition = (field: string) => {
//     if (!isSpeechRecognitionSupported) {
//       toast.error("Speech recognition not supported in this browser.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setListeningField(field);
//       toast.info("Listening...", { position: "top-right", autoClose: 2000 });
//     };

//     recognition.onresult = (event: any) => {
//       const spokenText = event.results[0][0].transcript;
//       setItemReturnFormData((prev) => ({
//         ...prev,
//         [field]: spokenText,
//       }));
//       toast.success(`Captured: ${spokenText}`, { position: "top-right", autoClose: 3000 });
//     };

//     recognition.onerror = (event: any) => {
//       console.error("Speech recognition error:", event.error);
//       toast.error("Error during speech recognition.", { position: "top-right", autoClose: 3000 });
//     };

//     recognition.onend = () => {
//       setListeningField(null);
//     };

//     recognition.start();
//   };

//   // Read label content aloud in Hindi
//   const readLabelContentInHindi = (hindiLabel: string) => {
//     const utterance = new SpeechSynthesisUtterance();
//     utterance.lang = "hi-IN";
//     utterance.text = hindiLabel; // Use the Hindi label for speaking
//     speechSynthesis.speak(utterance);

//     toast.info(`Reading label in Hindi: ${hindiLabel}`, { position: "top-right", autoClose: 3000 });
//   };

//   // Handle form field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setItemReturnFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/inventory/return/user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(itemReturnFormData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!", { position: "top-right", autoClose: 3000 });
//         setItemReturnFormData({
//           userId: "",
//           userName: "",
//           equipmentId: "",
//           equipmentName: "",
//           condition: "",
//           notes: "",
//         });
//       } else {
//         const errorData = await response.json();
//         toast.error(`Error: ${errorData.message}`, { position: "top-right", autoClose: 3000 });
//       }
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       toast.error("Failed to submit the form.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   return (
//     <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
//       <Breadcrumb pageName="ITEM RETURN FORM" />
//       <div className="flex flex-col gap-9">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
//               {/* Labels in English, but read in Hindi */}
//               {[
//                 { name: "userId", displayLabel: "User ID", hindiLabel: "उपयोगकर्ता पहचान" },
//                 { name: "userName", displayLabel: "User Name", hindiLabel: "उपयोगकर्ता नाम" },
//                 { name: "equipmentId", displayLabel: "Equipment ID", hindiLabel: "उपकरण पहचान" },
//                 { name: "equipmentName", displayLabel: "Equipment Name", hindiLabel: "उपकरण नाम" },
//                 { name: "condition", displayLabel: "Condition", hindiLabel: "स्थिति" },
//                 { name: "notes", displayLabel: "Notes", hindiLabel: "टिप्पणियाँ" },
//               ].map(({ name, displayLabel, hindiLabel }) => (
//                 <div key={name}>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     {displayLabel} <span className="text-meta-1">*</span>
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type={name === "notes" ? "textarea" : "text"}
//                       name={name}
//                       value={itemReturnFormData[name as keyof ItemReturnFormData]}
//                       onChange={handleChange}
//                       required
//                       className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                     />
//                     {isSpeechRecognitionSupported && (
//                       <>
//                         <button
//                           type="button"
//                           onClick={() => readLabelContentInHindi(hindiLabel)}
//                           className="ml-3 rounded bg-secondary p-2 text-white"
//                         >
//                           🔊 हिंदी
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => startSpeechRecognition(name)}
//                           className={`ml-3 rounded bg-primary p-2 text-white ${
//                             listeningField === name ? "animate-pulse" : ""
//                           }`}
//                         >
//                           🎤
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <div className="col-span-full flex justify-end">
//                 <button
//                   type="submit"
//                   className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
//                 >
//                   Submit Return
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemReturnForm;

"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { toast } from "react-toastify";

// Declare SpeechRecognition globally
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Define the shape of the form data
interface ItemReturnFormData {
  userId: string;
  userName: string;
  equipmentId: string;
  equipmentName: string;
  condition: string;
  notes: string;
}

const ItemReturnForm = () => {
  // State to manage form data
  const [itemReturnFormData, setItemReturnFormData] = useState<ItemReturnFormData>({
    userId: "",
    userName: "",
    equipmentId: "",
    equipmentName: "",
    condition: "",
    notes: "",
  });

  // State to track currently active field for speech input
  const [listeningField, setListeningField] = useState<string | null>(null);

  // State to check browser support for speech recognition
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

  useEffect(() => {
    // Check if the browser supports SpeechRecognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      setIsSpeechRecognitionSupported(true);
    } else {
      setIsSpeechRecognitionSupported(false);
    }
  }, []);

  // Start speech recognition for a specific field
  const startSpeechRecognition = (field: string) => {
    if (!isSpeechRecognitionSupported) {
      toast.error("Speech recognition not supported in this browser.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListeningField(field);
      toast.info("Listening...", { position: "top-right", autoClose: 2000 });
    };

    recognition.onresult = (event: any) => {
      let spokenText = event.results[0][0].transcript;

      // Convert the text to uppercase if the field is "equipmentId"
      if (field === "equipmentId") {
        spokenText = spokenText.toUpperCase();
      }

      setItemReturnFormData((prev) => ({
        ...prev,
        [field]: spokenText,
      }));
      toast.success(`Captured: ${spokenText}`, { position: "top-right", autoClose: 3000 });
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Error during speech recognition.", { position: "top-right", autoClose: 3000 });
    };

    recognition.onend = () => {
      setListeningField(null);
    };

    recognition.start();
  };

  // Read label content aloud in Hindi
  const readLabelContentInHindi = (hindiLabel: string) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "hi-IN";
    utterance.text = hindiLabel; // Use the Hindi label for speaking
    speechSynthesis.speak(utterance);

    toast.info(`Reading label in Hindi: ${hindiLabel}`, { position: "top-right", autoClose: 3000 });
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemReturnFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/inventory/return/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemReturnFormData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", { position: "top-right", autoClose: 3000 });
        setItemReturnFormData({
          userId: "",
          userName: "",
          equipmentId: "",
          equipmentName: "",
          condition: "",
          notes: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit the form.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ITEM RETURN FORM" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
              {/* Labels in English, but read in Hindi */}
              {[
                { name: "userId", displayLabel: "User ID", hindiLabel: "उपयोगकर्ता पहचान" },
                { name: "userName", displayLabel: "User Name", hindiLabel: "उपयोगकर्ता नाम" },
                { name: "equipmentId", displayLabel: "Equipment ID", hindiLabel: "उपकरण पहचान" },
                { name: "equipmentName", displayLabel: "Equipment Name", hindiLabel: "उपकरण नाम" },
                { name: "condition", displayLabel: "Condition", hindiLabel: "स्थिति" },
                { name: "notes", displayLabel: "Notes", hindiLabel: "टिप्पणियाँ" },
              ].map(({ name, displayLabel, hindiLabel }) => (
                <div key={name}>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {displayLabel} <span className="text-meta-1">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type={name === "notes" ? "textarea" : "text"}
                      name={name}
                      value={itemReturnFormData[name as keyof ItemReturnFormData]}
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                    {isSpeechRecognitionSupported && (
                      <>
                        <button
                          type="button"
                          onClick={() => readLabelContentInHindi(hindiLabel)}
                          className="ml-3 rounded bg-secondary p-2 text-white"
                        >
                          🔊 हिंदी
                        </button>
                        <button
                          type="button"
                          onClick={() => startSpeechRecognition(name)}
                          className={`ml-3 rounded bg-primary p-2 text-white ${
                            listeningField === name ? "animate-pulse" : ""
                          }`}
                        >
                          🎤
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <div className="col-span-full flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                >
                  Submit Return
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemReturnForm;
