// upload files(image, pdf) to bucket and return download urls, and delete local duplicates.
const { bucket } = require("../config/db");
const debugBucket = require("debug")("app:bucket");
const uuid = require("uuid");
const fs = require("fs");
const config = require("../config/config");

module.exports = {
  // this function saves uploaded files into local storage, then uploads them to cloud storage and gets URLs back, then deletes from local storage.
  async storageBucketUpload(filename) {
    //1, generate a random uuid storage token
    debugBucket(`uploading ${filename} `);
    const storageToken = uuid.v4();

    //2. declare filepath& options parameters for bucket upload
    const serverFilePath = `./public/uploads/${filename}`;
    const options = {
      destination: filename,
      resumable: true,
      validation: "crc32c",
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken,
        },
      },
    };

    // OPTIONAL DEBUGGING: Checks if server-side /uploads file exists before BUCKET UPLOAD
    fs.access(serverFilePath, fs.F_OK, (err) => {
      if (err) {
        debugBucket(err);
        return {
          message: "Error occurred in storing file to server",
        };
      } else {
        debugBucket("File Successfully Stored in Server");
      }
    });

    // 3. cloud firestore upload call
    const result = await bucket.upload(serverFilePath, options);
    const bucketName = result[0].metadata.bucket;
    debugBucket(`Bucket name: ${bucketName}`);

    //4. construct download url
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
    console.log(`File Successfully Uploaded to Storage Bucket: ${downloadURL}`);

    // 5. delete temporary local file
    fs.unlink(serverFilePath, (err) => {
      if (err) {
        console.log(err);
        return {
          message:
            "Error occurred when removing file from temporary local storage",
        };
      } else {
        console.log("File in temporary local storage has been deleted ");
      }
    });

    return downloadURL;
  },

  // Get File name from a download URL
  getFileFromUrl(downloadURL) {
    debugBucket(`DownloadURL from DB: ${downloadURL}`);
console.log("downloadURL from DB:", downloadURL);
    // Slice off the base URL from downloadURL
    console.log("config.db.storageBucket", config.db.storageBucketUrl);
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucketUrl}/o/`;
    let fileGlob = downloadURL.replace(baseURL, "");

    // Remove everything after the query string
    const indexOfEndPath = fileGlob.indexOf("?");
    fileGlob = fileGlob.substring(0, indexOfEndPath);

    // Return file glob to be deleted
    debugBucket(`File in Bucket for Deletion: ${fileGlob}`);
    return fileGlob;
  },


  async deleteFileFromBucket(oldFileName) {
    // Determine File Location in Storage
    // NOTE: You would ALSO want to CHECK if it existed in the storage bucket before deletion OTHERWISE it would hit an error!
    const file = bucket.file(oldFileName);
    const fileChecker = await file.exists();

    // [400 ERROR] Check for Item Existing in Storage Bucket
    // NOTE: To ensure our delete function still works against Firestore DB, we will modify the delete request to prevent an error.
    if (fileChecker[0] === false) {
      // [TOGGLE]: Set custom option parameter to prevent error returning (true = ignores missing file!)
      const options = {
        ignoreNotFound: true,
      };

      // Call modified delete request (no deletion from storage bucket)
      // NOTE: Default option is "false", meaning error is issued and delete request fails if file does NOT exist!
      const data = await file.delete(options);
      debugBucket(
        `The file: ${oldFileName}, does not exist in Storage.`
      );

      // Return API response to controller
      return data[0];

      // [SUCCESS] FILE EXISTS: Standard delete path
    } else {
      // Call standard delete request
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${oldFileName}`);

      // Return API response to controller
      return fileChecker[0];
    }
  },
};
