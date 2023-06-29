import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { AntDesign } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import * as ImagePicker from "expo-image-picker";
import base_url from "../../../URL/base_URL";
import * as DocumentPicker from "expo-document-picker";

const Post_NC = (props) => {
  const context = useContext(AuthGlobal);
  const [FullName, setFullName] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [LinkedinLink, setLinkedinLink] = useState("");
  const [PersonalEmail, setPersonalEmail] = useState("");
  const [ProfessionalEmail, setProfessionalEmail] = useState("");
  const [HighestQualification, setHighestQualification] = useState("");
  const [GraduationYear, setGraduationYear] = useState(0);
  const [Salary, setSalary] = useState(0);
  const [JobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedJobtitle, setselectedJobtitle] = useState(
    "Select Job Description"
  );
  const [resume, setresume] = useState(null);
  const [selectedId, setselectedId] = useState("");
  const [isClicked, setisClicked] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [data, setdata] = useState();
  const [item, setItem] = useState(null);
  const userID = context.stateUser.user.userId;

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setFullName(props.route.params.item.FullName);
      setCity(props.route.params.item.City);
      setCountry(props.route.params.item.Country);
      setJobTitle(props.route.params.item.JobTitle);
      setCompanyName(props.route.params.item.CompanyName);
      setLinkedinLink(props.route.params.item.LinkedinLink);
      setPersonalEmail(props.route.params.item.PersonalEmail);
      setProfessionalEmail(props.route.params.item.ProfessionalEmail);
      setHighestQualification(props.route.params.item.HighestQualification);
      setSelectedImage(props.route.params.item.image);
      setGraduationYear(props.route.params.item.GraduationYear.toString());
      setSalary(props.route.params.item.Salary.toString());
      setJobDescription(props.route.params.item.JobDescription);
      setresume(props.route.params.item.resume);
    }

    axios.get(`${base_url}Jds`).then((res) => {
      const data = res.data;
      const userJds = data.filter(
        (Jd) => Jd.userID === context.stateUser.user.userId
      );
      setdata(userJds);
    });

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${base_url}Users/${context.stateUser.user.userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${res}`,
            },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
      setdata([]);
    };
  }, [context.stateUser.isAuthenticated]);

  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);

    }
  };

  // c
  const handleFileUpload = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Specify the file type as PDF
      });
      console.log(document);
      setresume(document.uri);
      setIsUploaded(true);
    } catch (error) {
      console.log("Error in file selection:", error);
    }
  };



  const uploadImage = async () => {
    if (
      FullName === "" ||
      PersonalEmail === "" ||
      HighestQualification === "" ||
      GraduationYear === ""
    ) {
      // setError("Please fill all the required fields");
      console.log("err");
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Successfully Uploaded JD",
      });
      return false;
    }
    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      name: "image.jpg",
      type: "image/jpeg",
    });

    // const formData = new FormData();
    formData.append("ResumeUpload", {
      uri: resume,
      type: "application/pdf",
      name: "application.pdf",
    });

    formData.append("FullName", FullName);
    formData.append("City", City);
    formData.append("Country", Country);
    formData.append("JobTitle", JobTitle);
    formData.append("CompanyName", CompanyName);
    formData.append("LinkedinLink", LinkedinLink);
    formData.append("PersonalEmail", PersonalEmail);
    formData.append("ProfessionalEmail", ProfessionalEmail);
    formData.append("HighestQualification", HighestQualification);
    formData.append("GraduationYear", GraduationYear);
    formData.append("Salary", Salary);
    formData.append("JobDescription", selectedJobtitle);
    formData.append("JdId", selectedId);
    formData.append("userID", userID);
    if (item !== null) {
      try {
        const response = await axios.put(
          `${base_url}NewCandidates/${item._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          Toast.show({
            topOffset: 30,
            type: "success",
            text1: "Successfully Uploaded New Candidates",
          });
          setTimeout(() => {
            props.navigation.navigate("V_Candidates");
          }, 500);
        }
        console.log("Upload success", response.data);
      } catch (error) {
        Toast.show({
          topOffset: 30,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post(
          `${base_url}NewCandidates`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          Toast.show({
            topOffset: 30,
            type: "success",
            text1: "Successfully Uploaded New Candidates",
          });
          setTimeout(() => {
            props.navigation.navigate("V_Candidates");
          }, 500);
        }
        console.log("Upload success", response.data);
      } catch (error) {
        Toast.show({
          topOffset: 30,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
        console.error(error);
      }
    }
  };

  const Email = "yasoni2005@gmail.com";

  const PostMail = () => {
    if (
      FullName === "" ||
      PersonalEmail === "" ||
      HighestQualification === "" ||
      GraduationYear === ""
    ) {
      setError("Please fill all the required fields");
      Toast.show({
        topOffset: 30,
        type: "error",
        text1: "Please fill all the required fields",
        text2: "Please try again",
      });
      return false;
    }
    let AdminMail = {
      SendEmail: Email,
      FullName: FullName,
      PersonalEmail: PersonalEmail,
      HighestQualification: HighestQualification,
      GraduationYear: GraduationYear,
      ClientName: userProfile.name,
      ClientEmail: userProfile.email,
    };

    axios.post(`${base_url}NewCandidates/Email`, AdminMail).catch((error) => {
      console.log(error);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          margin: 40,
          backgroundColor: "grey",
          opacity: 0.5,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
            padding: 10,
            color: "white",
          }}
        >
          ADD NEW CANDIDATES
         
        </Text>
      </View>

      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
      

        <View style={{ alignItems: "center", marginBottom: 30 }}>
         
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: 180,
              height: 180,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "gray",
              backgroundColor: "rgba(225,225,225,0.5)",
            }}
          />
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              width: 180,
              height: 180,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "gray",
              position: "absolute",
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              position: "absolute",
              bottom: -15,
              backgroundColor: "gray",
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
            }}
          >
            <AntDesign name={"edit"} size={25} color={"white"} />
          </TouchableOpacity>
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Full Name
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="Type Your Full Name"
            name={"FullName"}
            id={"FullName"}
            value={FullName}
            autoCapitalize="none"
            onChangeText={(text) => setFullName(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            City
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="City"
            name={"City"}
            value={City}
            id={"City"}
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Country
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="Country"
            name={"Country"}
            value={Country}
            id={"Country"}
            onChangeText={(text) => setCountry(text)}
          />
        </View>
        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Current Job Title
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="Current Job Title"
            name={"JobTitle"}
            value={JobTitle}
            id={"JobTitle"}
            onChangeText={(text) => setJobTitle(text)}
          />
        </View>

      
        <View style={[styles.action, { paddingLeft: 10, zIndex: 0 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              zIndex: 0,
            }}
          >
            Company Name
          </Text>

          <TextInput
            placeholderTextColor={"grey"}
            color={"white"}
            placeholder="CompanyName"
            name={"CompanyName"}
            value={CompanyName}
            id={"CompanyName"}
            onChangeText={(text) => setCompanyName(text)}
          />
        </View>
        <View style={[styles.action, { paddingLeft: 15, padding: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Linkedin Link
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            color={"white"}
            placeholder="LinkedinLink"
            name={"LinkedinLink"}
            id={"LinkedinLink"}
            value={LinkedinLink}
            multiline={true}
            onChangeText={(text) => setLinkedinLink(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 15, padding: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Personal Email
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="PersonalEmail"
            name={"PersonalEmail"}
            id={"PersonalEmail"}
            value={PersonalEmail}
            multiline={true}
            onChangeText={(text) => setPersonalEmail(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Professional Email
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="ProfessionalEmail"
            name={"ProfessionalEmail"}
            id={"ProfessionalEmail"}
            value={ProfessionalEmail}
            onChangeText={(text) => setProfessionalEmail(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Highest Qualification
          </Text>
          <TextInput
            color={"white"}
            placeholderTextColor={"grey"}
            placeholder="HighestQualification"
            name={"HighestQualification"}
            id={"HighestQualification"}
            value={HighestQualification}
            onChangeText={(text) => setHighestQualification(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Graduation Year
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            color={"white"}
            placeholder="GraduationYear"
            name={"GraduationYear"}
            keyboardType="numeric"
            id={"GraduationYear"}
            value={GraduationYear}
            onChangeText={(text) => setGraduationYear(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              color: "white",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            Salary
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            color={"white"}
            placeholder="Salary"
            keyboardType="numeric"
            name={"Salary"}
            id={"Salary"}
            value={Salary}
            onChangeText={(text) => setSalary(text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleFileUpload }
          style={{
            borderWidth: 1.5,
            borderRadius: 5,
            borderColor: "gray",
            width: widths - 35,
            flexDirection: "row",
            height: heights * 0.08,
            justifyContent:'center',
            padding: 12,
            marginVertical: 15,
          }}
        >
        <View>
        {isUploaded ? (
          <Text  style={{ color: "white" }} >PDF file uploaded successfully!</Text>
        ) : (
          <Text  style={{ color: "white" }}>Upload a PDF file</Text>
        )}
      </View>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={styles.dropdownselector}
            onPress={() => {
              setisClicked(!isClicked);
            }}
          >
            <Text style={{ color: "white" }}>{selectedJobtitle}</Text>
            {isClicked ? (
              <AntDesign name="down" size={20} color={"white"} />
            ) : (
              <AntDesign name="up" size={20} color={"white"} />
            )}
          </TouchableOpacity>
          {isClicked ? (
            <View style={styles.dropdownarea}>
              <FlatList
                nestedScrollEnabled
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.countryItem}
                      onPress={() => {
                        setselectedJobtitle(item.JobTitle);
                        setselectedId(item._id);
                        setisClicked(false);
                      }}
                    >
                      <Text>{item.JobTitle}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>

        <View style={{ marginBottom: 30 }}></View>
        {selectedImage !== null ? (
          <View style={styles.button}>
            {error ? <Error message={error} /> : null}
            <TouchableOpacity
              style={styles.signup}
              onPress={() => [uploadImage(), PostMail()]}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        ) : (<View style={styles.button}>
            {error ? <Error message={error} /> : null}
            <TouchableOpacity
              style={styles.signup}
              onPress={() => alert('Please Select Profile Picture')}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>Confirm</Text>
            </TouchableOpacity>
          </View>)}
      </KeyboardAwareScrollView>
    </View>
  );
};

const { height, width } = Dimensions.get("screen");

const heights = height;
const widths = width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#05375a",
  },
  action: {
    marginVertical: 15,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "gray",
    width: widths - 35,
    alignSelf: "center",
    height: heights * 0.06,
    justifyContent: "center",
  },
  signup: {
    width: widths - 30,
    height: heights * 0.06,
    justifyContent: "center",
    backgroundColor: "#05375a",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
  },
  heading: {
    marginTop: 100,
    alignSelf: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  dropdownselector: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "gray",
    width: widths - 35,
    flexDirection: "row",
    height: heights * 0.08,
    justifyContent: "space-between",
    paddingLeft: 15,
    padding: 12,
    marginVertical: 15,
  },
  icon: {
    width: 20,
    height: 20,
    color: "white",
  },
  dropdownselector2: {
    width: "95%",
    height: 300,
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: "white",
    alignSelf: "center",
    
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
  },

  countryItem: {
    width: "80%",
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
  dropdownarea: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
  },
});

export default Post_NC;
