import React, { Component } from 'react'
import { ActivityIndicator, View, Text, StatusBar, Alert, } from 'react-native'
import PropTypes from 'prop-types'

import { NavigationActions } from 'react-navigation'
import Clarifai from 'clarifai'

import BackgroundImage from '../../components/BackgroundImage'
import AnswerNotification from '../../components/AnswerNotification'
import CaptureAndShare from '../../components/CaptureAndShare'
import XPButton from '../../components/XPButton'

import styles from './styles'

class PredictScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            result: '',
        }

        this._cancel = this._cancel.bind(this)
    }

    componentDidMount() {
        const clarifai = new Clarifai.App({
            apiKey: 'b28f187be477496db591e54b87bb49ca'
        })

        process.nextTick = setImmediate // RN polyfill

        const { data } = this.props.navigation.state.params.image
        const file = { base64: data }

        clarifai.models.predict(Clarifai.FOOD_MODEL, file)
            .then(response => {
                const { concepts } = response.outputs[0].data

                if (concepts && concepts.length > 0) {
                    for (const prediction of concepts) {
                        if (prediction.name === 'tacos' && prediction.value >= 0.90) {
                            return this.setState({ loading: false, result: 'Taco' })
                        }
                        this.setState({ result: 'Nah' })
                    }
                }

                this.setState({ loading: false })
            })
            .catch(e => {
                Alert.alert(
                    'An error has occured',
                    'Sorry, the quota may be exceeded, try again later!',
                    [
                        { text: 'OK', onPress: () => this._cancel() },
                    ],
                    { cancelable: false }
                )
            })
    }

    _cancel() {
        const backAction = NavigationActions.back()
        this.props.navigation.dispatch(backAction)
    }

    render() {
        const { type, data } = this.props.navigation.state.params.image
        const sourceImage = `data:${type};base64,${data}`

        return (
            <BackgroundImage source={{ uri: sourceImage }}>
                <StatusBar hidden />
                {
                    this.state.loading ?
                        <View style={styles.loader}>
                            <ActivityIndicator color='#95a5a6' />
                            <Text style={styles.loaderText}>Analyzing...</Text>
                        </View> :
                        <View style={styles.container}>
                            <AnswerNotification answer={this.state.result} />
                            <CaptureAndShare
                                title='Share'
                                color='#3498db'
                                image={sourceImage}
                                onCancel={this._cancel}
                            />
                            <XPButton
                                title='Non merci'
                                color='black'
                                textOnly
                                onPress={this._cancel}
                            />
                        </View>
                }
            </BackgroundImage>
        )
    }
}

PredictScreen.propTypes = {
    navigation: PropTypes.object,
}

export default PredictScreen