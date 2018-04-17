import React, { Component } from 'react'
import { Alert, View, StatusBar, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import ImagePicker from 'react-native-image-picker'

import Header from '../../components/Header'
import BackgroundImage from '../../components/BackgroundImage'
import XPButton from '../../components/XPButton'

import styles from './styles'

class HomeScreen extends Component {
    static navigationOptions = {
        header: <Header title='Taco Or Nah' subtitle="Life's most important question" />,
    }

    constructor() {
        super()

        this.state = {
            loading: false,
        }

        this._onClick = this._onClick.bind(this)

        this.options = {
            title: 'select an image',
            takePhotoButtonTitle: 'Take A Pic',
            chooseFromLibraryButtonTitle: 'Choose from Photos',
            cancelButtonTitle: 'Cancel',
            cameraType: 'back',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'TacoOrNah'
            }
        }
    }

    _onClick() {
        this.setState({ loading: true })
        ImagePicker.showImagePicker({
            title: 'select an image',
            takePhotoButtonTitle: 'Take A Pic',
            chooseFromLibraryButtonTitle: 'Choose from Photos',
            cancelButtonTitle: 'Cancel',
            cameraType: 'back',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'TacoOrNah'
            }
        }, (response) => {
            if (response.didCancel) {
                this.setState({ loading: false })
            } else if (response.error) {
                Alert.alert('Error', 'Verify the permissions to use the camera', { cancelable: false })
                this.setState({ loading: false })
            } else {
                const { navigate } = this.props.navigation
                navigate('Prediction', { image: response })
                this.setState({ loading: false })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <BackgroundImage source={require('../../assets/bkg.png')}>
                    {
                        !this.state.loading ?
                            <XPButton
                                title='Analyze an image!'
                                style={{borderRadius: 50}}
                                onPress={this._onClick}
                            />
                            : <ActivityIndicator size="large" color="#e74c3c" />
                    }
                </BackgroundImage>
            </View>
        )
    }
}

HomeScreen.propTypes = {
    navigation: PropTypes.object,
}

export default HomeScreen