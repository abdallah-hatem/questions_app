import { RootState, store } from "@/store"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { Button, Modal, Text } from "react-native-paper"
import { useSelector } from "react-redux"

interface ModalProps {
  networkError?: boolean
  onRefresh?: () => void
}

const useModal = ({ networkError = false, onRefresh }: ModalProps) => {
  //   const [modalVisible, setModalVisible] = useState(false)

  //   const state = store.getState()

  //   useEffect(() => {
  //     console.log(state.general.networkError, "state")

  //     setModalVisible(state.general.networkError)
  //   }, [state])

  const renderModal = () => {
    return (
      <Modal visible={networkError}>
        <View
          style={{
            backgroundColor: "white",
            height: 200,
            margin: 20,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Error! check your internet connection</Text>
            <Button
              style={{ marginTop: 30, backgroundColor: "red" }}
              onPress={() => onRefresh?.()}
            >
              <Text style={{ color: "white" }}>Refresh</Text>
            </Button>
          </View>
        </View>
      </Modal>
    )
  }

  return { renderModal }
}

export default useModal
