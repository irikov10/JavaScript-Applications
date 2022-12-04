export function getUserData() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data
}

// export function setUserData(data) {
//     sessionStorage.setItem('userData', JSON.stringify(data));
// }

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export async function updateNav() {
    if(sessionStorage.length) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}