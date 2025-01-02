import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "hami.nepali",
  projectId: "66a25db900015d1585c5",
  databaseId: "66a25e78003bb44a1bae",
  storageId: "66a4f829001408bb1bfc",
  userId: "66a25e9200233ec0210c",
  postId: "66a5e42e000e5385d888",
  eventId: "6772c4ff001e492ba759",
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(username);

    await signInUser(email, password);
    const newUser = await database.createDocument(
      config.databaseId,
      config.userId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signInUser = async (email, password) => {
  try {
    console.log(email, password);
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userId,
      [Query.equal("email", currentAccount.email)]
    );
    if (!currentAccount) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

// export const getFilePreview = async (fileId, type) => {
//   let fileUrl;
//   try {
//     if (type === "video") {
//       fileUrl = storage.getFileView(config.storageId, fileId);
//     } else if (type === "image") {
//       fileUrl = storage.getFilePreview(
//         config.storageId,
//         fileId,
//         2000,
//         2000,
//         "top",
//         100
//       );
//     } else {
//       throw new Error("Invalid file type.");
//     }
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const getFilePreview = async (fileId, type) => {
  try {
    if (type === "video" || type === "image") {
      // Use getFileView for the original file
      return storage.getFileView(config.storageId, fileId);
    } else {
      throw new Error(
        "Invalid file type. Only 'video' and 'image' are supported."
      );
    }
  } catch (error) {
    throw new Error(`Error getting file preview: ${error.message}`);
  }
};

// const uploadFile = async (file, type) => {
//   console.log(file);
//   if (!file) return;
//   const { mimeType, ...rest } = file;
//   const asset = {
//     name: file.fileName,
//     type: file.mimeType,
//     size: file.fileSize,
//     uri: file.uri,
//   };
//   try {
//     const uploadedFile = await storage.createFile(
//       config.storageId,
//       ID.unique(),
//       asset
//     );
//     const fileUrl = getFilePreview(uploadedFile.$id, type);
//     console.log(fileUrl);
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const uploadFile = async (file, type) => {
  if (!file) {
    console.error("No file provided.");
    return null;
  }

  const { fileName, mimeType, fileSize, uri } = file;

  try {
    // Upload the file
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      {
        name: fileName,
        type: mimeType,
        size: fileSize,
        uri,
      }
    );

    // Retrieve the file URL
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    // console.log("Uploaded file URL:", fileUrl);
    return fileUrl;
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// export const createPost = async (form) => {
//   try {
//     const [imageUrl, videoUrl] = await Promise.all([
//       uploadFile(form.image, "image"),
//       uploadFile(form.video, "video"),
//     ]);
//     // console.log(imageUrl, videoUrl);
//     const newPost = await database.createDocument(
//       config.databaseId,
//       config.postId,
//       ID.unique(),
//       {
//         title: form.title,
//         description: form.description,
//         image: imageUrl,
//         video: videoUrl,
//         creator: form.userId,
//       }
//     );
//     return newPost;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const getAllPost = async () => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.postId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const createEvent = async (form) => {
  try {
    const imageUrl = await uploadFile(form.eventImage, "image");
    console.log(imageUrl);
    console.log(form);
    const newEvent = await database.createDocument(
      config.databaseId,
      config.eventId,
      ID.unique(),
      {
        eventTitle: form.eventTitle,
        eventDescription: form.eventDescription,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
        eventLocation: form.eventLocation,
        eventImage: imageUrl,
        creator: form.userId,
      }
    );
    console.log(newEvent);
    return newEvent;
  } catch (error) {
    throw new Error(error);
  }
};

export const getEvents = async () => {
  try {
    const events = await database.listDocuments(
      config.databaseId,
      config.eventId
    );
    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
