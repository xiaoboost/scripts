import { active as activeGalleryDownloader } from './features/gallery-downloader';
import { active as activeListDownloader } from './features/list-downloader';

export function active() {
  activeGalleryDownloader();
  activeListDownloader();
}
