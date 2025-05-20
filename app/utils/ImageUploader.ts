import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebaseConfig";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param file - The image file to upload
 * @param path - Path in Firebase Storage (e.g., "banners/banner-123.jpg")
 * @returns Download URL of the uploaded file
 */
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = async (file: File, path: string): Promise<string> => {
  console.log("⏳ Starting upload to Firebase:", path);
  const storageRef = ref(storage, path);
  console.log('storageRef',storageRef)

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("✅ Upload successful:", snapshot.metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("📦 File available at:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("🔥 Upload failed in uploadImageToFirebase:", error);
    throw error; // so caller's catch block will also fire
  }
};



export const deleteImageFromFirebase = async (imageUrl: string) => {
  try {
    const decodedUrl = decodeURIComponent(imageUrl);
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/";
    const path = decodedUrl.replace(baseUrl, "").split("?")[0];

    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deleting from Firebase:", error);
    return false;
  }
};

// export const uploadMultipleImagesToFirebase = async (
//     files: File[],
//     basePath: string
//   ): Promise<string[]> => {
//     const uploadPromises = files.map((file, index) => {
//       const extension = file.name.split('.').pop();
//       const uniqueName = `image-${Date.now()}-${index}.${extension}`;
//       const fullPath = `${basePath}/${uniqueName}`;
//       return uploadImageToFirebase(file, fullPath);
//     });
  
//     return await Promise.all(uploadPromises);
//   };
  