var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(PageLoaded);
function PageLoaded() {
    return __awaiter(this, void 0, void 0, function* () {
        if (hasServiceWorkerSupport()) {
            console.log("Service Worker Supported");
            const swRegistration = yield registerServiceWorker();
            const permission = yield requestNotificationPermission();
        }
    });
}
function hasServiceWorkerSupport() {
    if (!('serviceWorker' in navigator))
        throw new Error('No Service Worker support!');
    if (!('PushManager' in window))
        throw new Error('No Push API Support!');
    return true;
}
const registerServiceWorker = () => __awaiter(this, void 0, void 0, function* () {
    const swRegistration = yield navigator.serviceWorker.register('/scripts/serviceWorker.js');
    return swRegistration;
});
const requestNotificationPermission = () => __awaiter(this, void 0, void 0, function* () {
    const permission = yield window.Notification.requestPermission();
    if (permission !== 'granted')
        throw new Error('Permission not granted for Notification');
});
