import Constants from "expo-constants";

const metroHost = Constants.manifest.debuggerHost.split(":").shift();
console.log(metroHost);

export default metroHost;
