interface StorageProps {
    key: string
    value?: any
}

export const setLocalstorage = ({ key, value }: StorageProps) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.log(error);
    }
}

export const getLocalStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.log(error);
        return null
    }
}
