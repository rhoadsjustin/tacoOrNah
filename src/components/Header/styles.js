import { StyleSheet } from 'react-native'

const colors = {
    red: '#BF0A30',
    white: '#002868',
    black: '#FFFFFF',
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'center',
    },
    titleWrapper: {
        height: 80,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.black,
    },
    title: {
        color: colors.white,
        fontSize: 50,
        fontWeight: 'bold',
    },
    subtitleWrapper: {
        height: 40,
        backgroundColor: colors.white,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.black,
        overflow: 'visible'
    },
    subtitle: {
        color: colors.red,
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default styles