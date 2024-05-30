import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const DemandList = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [refreshing, setRefreshing] = useState(false);
  const [historicalRequests, setHistoricalRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const infirmierId = route.params.infirmierId;

  useEffect(() => {
    fetchHistoricalRequests();
  }, []);

  const fetchHistoricalRequests = async () => {
    try {
      const response = await axios.get(
        `http://172.16.1.236:8080/api/infirmiers/${infirmierId}/requests`
      );
      const data = response.data;
      setHistoricalRequests(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes:", error);
    }
  };

  const handleProfileNavigation = () => {
    navigation.push("profileInfirmier");
  };

  const renderClientDetailsModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Détails du client</Text>
            {selectedRequest && (
              <View style={styles.clientDetails}>
                <Image
                  source={require("../../assets/images/image1.png")}
                  style={styles.userIcon}
                />
                <Text style={styles.clientName}>
                  {selectedRequest.patientFullName}
                </Text>
                <Text style={styles.location}>
                  Localisation: {selectedRequest.patientAddress}
                </Text>
                <Text style={styles.phoneNumber}>
                  Téléphone: {selectedRequest.patientPhone}
                </Text>

                <Text style={styles.detailsdemande}>
                  Détails de la demande:
                </Text>
                <Text style={styles.details}>{selectedRequest.details}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.requestContainer}
      onPress={() => {
        setSelectedRequest(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.requestDetails}>
        <Text style={styles.clientName}>{item.patientFullName}</Text>
        <Text style={styles.location}>Localisation: {item.patientAddress}</Text>
        <Text style={styles.phoneNumber}>Téléphone: {item.patientPhone}</Text>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistoricalRequests();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfileNavigation}
        >
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Historique des demandes clients</Text>
        <FlatList
          data={historicalRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {renderClientDetailsModal()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  profileButton: {
    position: "absolute",
    top: 10,
    right: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  requestContainer: {
    backgroundColor: "#F0F0F0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  requestDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#29CCB1",
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
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
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  clientDetails: {
    alignItems: "center",
  },
  userIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 40,
  },
  closeButton: {
    backgroundColor: "#29CCB1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    textAlign: "center",
  },
  detailsdemande: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#29CCB1",
  },
});

export default DemandList;
