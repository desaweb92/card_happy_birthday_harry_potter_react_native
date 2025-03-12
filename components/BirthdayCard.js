import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import ConfettiCannon from "react-native-confetti-cannon";

const { width, height } = Dimensions.get("window");

const BirthdayCard = () => {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  const handleCelebrateClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openFullScreenModal = () => {
    setShowFullScreenModal(true);
  };

  const closeFullScreenModal = () => {
    setShowFullScreenModal(false);
    setShowModal(false);
    setShowFinalImage(true);
    setIsCelebrating(true);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      transform: [
        {
          scale: withTiming(scale.value, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  React.useEffect(() => {
    scale.value = 1;
    opacity.value = 1;
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Imagen1.jpg")}
        style={styles.backgroundImage}
      />
      {!showFinalImage ? (
        <>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Image
              source={require("../assets/images/CasasUno.jpg")}
              style={styles.cardImage}
            />
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Image
                source={require("../assets/images/Feliz_cumple_amorcito.png")}
                style={styles.messageImage}
              />
              <Text style={styles.messageText}>
                Que tu día esté lleno de magia, amor y felicidad infinita. Eres
                la luz que ilumina mi vida y hoy quiero celebrarte como te
                mereces. ¡Te amo con todo mi corazón!
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCelebrateClick}
              >
                <Text style={styles.buttonText}>¡Hay algo para ti!</Text>
              </TouchableOpacity>
              {customMessage && (
                <Text style={styles.customMessage}>{customMessage}</Text>
              )}
            </View>
          </Animated.View>

          {/* First Modal */}
          {showModal && (
            <Modal transparent visible={showModal} animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Image
                    source={require("../assets/images/Carta.jpg")}
                    style={styles.modalImage}
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={openFullScreenModal}
                  >
                    <Text style={styles.modalButtonText}>Recibir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {/* Full Screen Modal */}
          {showFullScreenModal && (
            <Modal
              transparent
              visible={showFullScreenModal}
              animationType="fade"
            >
              <View style={styles.fullScreenModalContainer}>
                <View style={styles.fullScreenModalContent}>
                  <Image
                    source={require("../assets/images/Carta.png")}
                    style={styles.fullScreenModalImage}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeFullScreenModal}
                  >
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </>
      ) : (
        <>
          <Image
            source={require("../assets/images/Imagen_final.jpg")}
            style={styles.finalImage}
          />
         <ConfettiCannon
            count={300}
            origin={{ x: -10, y: -200 }}
            explosionSpeed={1000}
            fallSpeed={4000}
            minWidth={width * 0.5}
            height={500}
            fadeOut={true}
            autoStart={isCelebrating}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Asegura que la imagen cubra todo el fondo
  },
  card: {
    width: 300,
    height: 270,
    backgroundColor: "#000",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    overflow: "hidden",
    margin: 8,
  },
  cardImage: {
    width: "100%", // Asegura que la imagen ocupe todo el ancho del contenedor
    height: "100%", // Asegura que la imagen ocupe todo el alto del contenedor
    position: "absolute",
    resizeMode: "contain", // Asegura que la imagen cubra todo el contenedor sin distorsionarse
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  messageImage: {
    width: 400,
    height: 30,
    resizeMode: "contain",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#e8b639",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  customMessage: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: "#B8433A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 16,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fullScreenModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  fullScreenModalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenModalImage: {
    width: 300,
    height: 450,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#B8433A",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#7b081b",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  finalImage: {
    width: 300,
    height: 450,
  },
});

export default BirthdayCard;
