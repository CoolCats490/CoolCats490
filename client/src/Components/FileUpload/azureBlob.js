// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
//https://github.com/shubhamagarwal/Blob-Storage
import { BlobServiceClient} from '@azure/storage-blob';
import {v1 as uuid} from "uuid";

const sasToken = process.env.storagesastoken || "sv=2020-08-04&ss=b&srt=sco&sp=rwdlactfx&se=2022-06-30T20:14:51Z&st=2022-03-26T12:14:51Z&spr=https,http&sig=OGfYq4k14s%2B4YcuyoLzuT934nL3Q86x%2BjbkfWvvjsDA%3D"; // Fill string with your SAS token
const containerName = `squadseekpics`;
const storageAccountName = process.env.storageresourcename || "cs41003200081652ddf"; // Fill string with your Storage resource name

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !((!storageAccountName || !sasToken));
};

// return list of blobs in container to display
// const getBlobsInContainer = async (containerClient) => {
//   const returnedBlobUrls = [];

//   // get list of blobs in container
//   // eslint-disable-next-line
//   for await (const blob of containerClient.listBlobsFlat()) {
//     // if image is public, just construct URL
//     returnedBlobUrls.push(
//       `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
//     );
//   }

//   return returnedBlobUrls;
// };


const createBlobInContainer = async (containerClient, file) => {

    let fileName = "Squad-Seek-Pic-" + uuid() + ".jpg";
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(fileName);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
  await blobClient.setMetadata({UserName : 'squad'});

  return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`
};

const uploadFileToBlob = async (file) => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

  // upload file
  return await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  //return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
