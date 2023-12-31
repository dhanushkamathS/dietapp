
import AsyncStorage from '@react-native-async-storage/async-storage';
export  const CalorieCalculator = (value,carb,fat,protein) => {
    const newCarb = (carb*value)/100
    const newFat = (fat*value)/100
    const newProtein= (protein*value)/100
    const newCalorie = (4*newCarb) + (4*newProtein) + (9*newFat)

    return {carb:newCarb,fat:newFat,protein:newProtein,calories:newCalorie}
}


export const emailValidator = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    const val = expression.test(String(email).toLowerCase())
    console.log(val)
    return val
}

export const storeUserId = async (id)=>{
    try {
        await AsyncStorage.setItem('userId', id)
    } catch (error) {
        console.log(error)
    }
}

export const getStoredId = async () => {
    try {
         const jsonValue = await AsyncStorage.getItem('userId')
        
        return jsonValue != null ? jsonValue : null;
    } catch (error) {
            console.log(error)
        }
    }