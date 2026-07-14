// Maps a deity's Tamil name to its real uploaded photo.
// Any deity not listed here falls back to the general swami collage photo.
// To add more real photos later: import the file below and add an entry here.
import swamiImg from "./swami.jpg";
import perumalImg from "./perumal.jpg";
import isakkiAmmanImg from "./isakki-amman.jpg";

export const deityImageByName = {
  "ஸ்ரீ பூமி அளந்த பெருமாள்": perumalImg,
  "ஸ்ரீ இசக்கி அம்மன்": isakkiAmmanImg,
};

export const defaultDeityImage = swamiImg;

export function getDeityImage(tamilName) {
  return deityImageByName[tamilName] || defaultDeityImage;
}
