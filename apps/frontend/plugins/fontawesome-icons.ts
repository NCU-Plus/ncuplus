import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faClipboardList,
  faComment,
  faComments,
  faSearch,
  faBars,
  faThumbsUp,
  faThumbsDown,
  faCheck,
  faExclamationTriangle,
  faTimes,
  faEllipsisV,
  faCaretDown,
  faCaretUp,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

config.autoAddCss = false;

library.add(faGithubSquare);
library.add(faSearch);
library.add(faBook);
library.add(faComment);
library.add(faComments);
library.add(faClipboardList);
library.add(faBars);
library.add(faThumbsUp);
library.add(faThumbsDown);
library.add(faCheck);
library.add(faExclamationTriangle);
library.add(faTimes);
library.add(faEllipsisV);
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faSignal);

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line
  //@ts-ignore
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon, {});
});
