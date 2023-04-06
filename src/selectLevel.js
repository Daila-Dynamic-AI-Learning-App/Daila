import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Modal, ActivityIndicator, Image, Alert} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function LoginScreen() {
  const [studyLevel, setStudyLevel] = useState("");
  const [topicOfInterest, setTopicOfInterest] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLevelSelect = () => {
    if (studyLevel === "Select your level of education") {
      Alert.alert("🤨 Wait a second...","Please select a valid level of education");
    } else {
      setStudyLevel(studyLevel);
      setShowPicker(false);
    }
  };
  
  const handleSubjectSelect = () => {
    if (topicOfInterest === "Select your topic") {
      Alert.alert("🤨 Wait a second...","Please select a valid topic");
    } else {
      setTopicOfInterest(topicOfInterest);
      setShowPicker3(false);
    }
  };
  const handleYearSelect = () => {
    if (studyYear === "Select your school year") {
      Alert.alert("🤨 Wait a second...","Please select a valid school year.");
    } else {
      setStudyYear(studyYear);
      setShowPicker2(false);
    }
  };
  

  const elementarySchoolSubjects = [
    "Select your topic",
    "Math",
"Language Arts",
"Science",
"Social Studies",
"Physical Education",
"Health Education",
"Music",
"Art",
"Drama",
"Technology Education",
"French Language",
"Spanish Language",
"Writing",
"Spelling",
"Handwriting",
"Geography",
"History",
"Civics",
"Character Education",
"Environmental Studies",
"Computer Science",
"Library Science",
"Media Literacy"
  ];

  const middleSchoolSubjects = [
    "Select your topic",
    "Space Science",
    "Life Science",
"Mathematics",
"Language Arts",
"Science",
"Social Studies",
"Physical Education",
"Health Education",
"Music",
"Art",
"Drama",
"Technology Education",
"French Language",
"Spanish Language",
"Latin Language",
"Writing",
"Spelling",
"Handwriting",
"Grammar",
"Vocabulary",
"Literature",
"Creative Writing",
"Debate",
"Critical Thinking",
"Study Skills",
"Geography",
"History",
"Civics",
"Economics",
"Environmental Studies",
"Media Literacy"
  ];

  const highSchoolSubjects = [
    "Select your topic",
    "Mathematics",
    "Algebra",
    "Geometry",
    "Calculus",
    "Statistics",
    "Trigonometry",
    "Biology",
    "Chemistry",
    "Physics",
    "Environmental Science",
    "Anatomy and Physiology",
    "Forensic Science",
    "Earth Science",
    "Astronomy",
    "Computer Science",
    "Web Development",
    "Mobile App Development",
    "Art",
    "Music",
    "Drama",
    "Film Studies",
    "Literature",
    "Creative Writing",
    "Journalism",
    "History",
    "World History",
    "Universal History",
    "Government",
    "Economics",
    "Psychology"
  ];

  const collegeSubjects = 
    [ "Select your topic", 
        "Accounting",  
      "Aerospace Engineering", 
      "Agricultural Business and Management",
        "Agricultural Economics", 
          "Agricultural Engineering", 
          "Agriculture", 
            "Animal Sciences",  
            "Anthropology", 
            "Applied Mathematics", 
              "Architecture", 
              "Art History",  
              "Biochemistry", 
                "Biology", 
                "Biomedical Engineering", 
                  "Business Administration and Management",  
                  "Chemical Engineering",  
                  "Chemistry",  
                  "Civil Engineering", 
                  "Clinical Psychology", 
                    "Communications", 
                    "Computer Engineering", 
                      "Computer Science",  
                      "Criminal Justice",  
                      "Dental Hygiene", 
                      "Dentistry", 
                        "Early Childhood Education", 
                        "Economics", 
                          "Education", 
                          "Electrical Engineering",  
                          "Elementary Education",  
                          "Engineering", 
                            "English", 
                            "Environmental Science",  
                            "Environmental Studies",  
                            "Fashion Design", 
                              "Film and Video", 
                              "Finance", 
                              "Fine Arts", 
                                "Food Science", 
                                "Foreign Languages and Literatures",  
                                "Forensic Science",  
                                "Geography",  
                                "Geology",  
                                "Graphic Design",  
                                "Health and Physical Education", 
                                  "Health Sciences", 
                                  "History",  
                                  "Hospitality Management",  
                                  "Human Resources Management", 
                                    "Industrial Engineering",  
                                    "Information Science",  
                                    "Information Technology",  
                                    "International Business",  
                                    "Journalism",  
                                    "Landscape Architecture",  
                                    "Law",  
                                    "Liberal Arts and Sciences",  
                                    "Linguistics",  
                                    "Management Information Systems",  
                                    "Marketing",  
                                    "Materials Science and Engineering",  
                                    "Mathematics",  
                                    "Mechanical Engineering",  
                                    "Medical Laboratory Science",  
                                    "Medicine",  
                                    "Music",  
                                    "Nursing",  
                                    "Nutrition and Dietetics",  
                                    "Occupational Therapy",  
                                    "Operations Management",  
                                    "Optometry",  
                                    "Pharmacy",  
                                    "Philosophy",  
                                    "Physical Therapy",  
                                    "Physics", 
                                    "Political Science",  
                                    "Psychology",  
                                    "Public Health",  
                                    "Public Relations",  
                                    "Real Estate",  
                                    "Social Work",  
                                    "Sociology",  
                                    "Software Engineering",  
                                    "Special Education", 
                                      "Sports Management",  
                                      "Statistics",  
                                      "Supply Chain Management",  
                                      "Sustainability Studies",  
                                      "Theater",  
                                      "Urban Planning",  
                                      "Veterinary Medicine",  
                                      "Web Design and Development",
        "Women's Studies"]

  ;

  const elementarySchoolYear = [
    "Select your school year",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",];
  const middleSchoolYear = [
    "Select your school year",
    "Grade 7",
    "Grade 8",
    "Grade 9",
  ];

  const highSchoolYear = [
    "Select your school year",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

  const collegeYear = [
    "Select your school year",
    "1st year",
    "2nd year",
    "3rd year",
    "4th year",
    "5th year",
    "6th year",
  ];

  const subjects =
    studyLevel === "Elementary School"
      ? elementarySchoolSubjects
      : studyLevel === "Middle School"
      ? middleSchoolSubjects
      : studyLevel === "High School"
      ? highSchoolSubjects
      : collegeSubjects;

  const year =
    studyLevel === "Elementary School"
      ? elementarySchoolYear
      : studyLevel === "Middle School"
      ? middleSchoolYear
      : studyLevel === "High School"
      ? highSchoolYear
      : collegeYear;

  // this function handles the onpress event of the next button
  const handleSubmit = async () => {
    setLoading(true);
    // get saved token from the asyncstorage
    const token = await AsyncStorage.getItem("token");

    // create a data object to be sent to the server
    const data = {
      studyLevel,
      topicOfInterest,
      studyYear,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://daila.onrender.com/api/v1/study",
      headers: { "content-type": "application/json", "X-Token": token },
      data: data,
    };
    
    if (studyLevel === "Select your level of education" || topicOfInterest === "Select your topic" || studyYear === "Select your school year") {
      Alert.alert("🤨 Wait a second...","Please fill all the fields correctly");
    } else {
      try {
        console.log(config.data);
        const response = await axios(config);
        const studyId = response.data.studyId;
        console.log(studyId);
        await AsyncStorage.setItem('studyId', studyId);
        console.log(response.status);
        if (response.status === 202) {
          navigation.navigate("BellPrompt");
        } else {
          navigation.navigate("Home");
        }
      } catch (err) {
        console.log(err.message);
      }
      finally {
        setLoading(false);}
    }
    
    
     
  };
  
  

  return (
    <><View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.welcome}>Getting Started</Text>
      </View>

      <View style={styles.subContainerB}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={[styles.inputContainer, styles.pickerContainer]}
            onPress={() => setShowPicker(true)}>
            <Image
              source={require("./assets/levelEducation.png")}
              style={styles.icon} />
            <Text style={styles.pickerText}>
              {studyLevel ? studyLevel : "Select your level of education"}
            </Text>
            <Image source={require("./assets/arrow.png")} style={styles.icon} />
          </TouchableOpacity>
          <Modal visible={showPicker} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowPicker(false)} />
                <Text style={styles.modalHeaderText}>Select your level</Text>
                <View style={styles.modalHeaderRight}>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleLevelSelect()}>
                    <Text style={styles.modalHeaderButtonText}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={studyLevel}
                  onValueChange={(itemValue) => setStudyLevel(itemValue)}
                >
                   <Picker.Item label="Select your level of education" value="Select your level of education" />
                  <Picker.Item label="Elementary School" value="Elementary School" />
                  <Picker.Item label="Middle School" value="Middle School" />
                  <Picker.Item label="High School" value="High School" />
                  <Picker.Item label="College" value="College" />
                </Picker>
              </View>
            </View>
          </Modal>
          

          {studyLevel === "Elementary School" ? (
            <>
              <TouchableOpacity
                style={[styles.inputContainer, styles.pickerContainer]}
                onPress={() => setShowPicker2(true)}
              >
                <Image
                  source={require("./assets/year.png")}
                  style={styles.icon} />
                <Text style={styles.pickerText}>
                  {studyYear ? studyYear : "Select your year"}
                </Text>
                <Image
                  source={require("./assets/arrow.png")}
                  style={styles.icon} />
              </TouchableOpacity>

              <Modal visible={showPicker2} animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowPicker2(false)}>

                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>Select your year</Text>
                    <View style={styles.modalHeaderRight}>
                      <TouchableOpacity onPress={() => setShowPicker2(false)}>
                        <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleYearSelect()}>
                        <Text style={styles.modalHeaderButtonText}>Select</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={studyYear}
                      onValueChange={(itemValue) => setStudyYear(itemValue)}
                    >
                      {elementarySchoolYear.map((subject) => (
                        <Picker.Item key={subject} label={subject} value={subject} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </Modal>
            </>
          ) : studyLevel === "Middle School" ? (
            <>
              <TouchableOpacity
                style={[styles.inputContainer, styles.pickerContainer]}
                onPress={() => setShowPicker2(true)}
              >
                <Image
                  source={require("./assets/year.png")}
                  style={styles.icon} />
                <Text style={styles.pickerText}>
                  {studyYear ? studyYear : "Select your year"}
                </Text>
                <Image
                  source={require("./assets/arrow.png")}
                  style={styles.icon} />
              </TouchableOpacity>

              <Modal visible={showPicker2} animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowPicker2(false)}>

                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>Select your year</Text>
                    <View style={styles.modalHeaderRight}>
                      <TouchableOpacity onPress={() => setShowPicker2(false)}>
                        <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleYearSelect()}>
                        <Text style={styles.modalHeaderButtonText}>Select</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={studyYear}
                      onValueChange={(itemValue) => setStudyYear(itemValue)}
                    >
                      {middleSchoolYear.map((year) => (
                        <Picker.Item key={year} label={year} value={year} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </Modal>
            </>
          ) : studyLevel === "High School" ? (
            <>
              <TouchableOpacity
                style={[styles.inputContainer, styles.pickerContainer]}
                onPress={() => setShowPicker2(true)}
              >
                <Image
                  source={require("./assets/year.png")}
                  style={styles.icon} />
                <Text style={styles.pickerText}>
                  {studyYear ? studyYear : "Select your year"}
                </Text>
                <Image
                  source={require("./assets/arrow.png")}
                  style={styles.icon} />
              </TouchableOpacity>

              <Modal visible={showPicker2} animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowPicker2(false)}>

                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>Select your year</Text>
                    <View style={styles.modalHeaderRight}>
                      <TouchableOpacity onPress={() => setShowPicker2(false)}>
                        <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleYearSelect()}>
                        <Text style={styles.modalHeaderButtonText}>Select</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={studyYear}
                      onValueChange={(itemValue) => setStudyYear(itemValue)}
                    >
                      {highSchoolYear.map((year) => (
                        <Picker.Item key={year} label={year} value={year} />
                      ))}
                    </Picker>
                  </View>

                </View>
              </Modal>
            </>

          ) : studyLevel === "College" ? (
            <>
              <TouchableOpacity
                style={[styles.inputContainer, styles.pickerContainer]}
                onPress={() => setShowPicker2(true)}
              >
                <Image
                  source={require("./assets/year.png")}
                  style={styles.icon} />
                <Text style={styles.pickerText}>
                  {studyYear ? studyYear : "Select your year"}
                </Text>
                <Image
                  source={require("./assets/arrow.png")}
                  style={styles.icon} />
              </TouchableOpacity>

              <Modal visible={showPicker2} animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowPicker2(false)}>

                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>Select your year</Text>
                    <View style={styles.modalHeaderRight}>
                      <TouchableOpacity onPress={() => setShowPicker2(false)}>
                        <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleYearSelect()}>
                        <Text style={styles.modalHeaderButtonText}>Select</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={studyYear}
                      onValueChange={(itemValue) => setStudyYear(itemValue)}
                    >
                      {collegeYear.map((year) => (
                        <Picker.Item key={year} label={year} value={year} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </Modal>
            </>

          ) :
            (
              <View>
              </View>
            )}

        </View>
        {studyLevel === "Elementary School" ? (
          <>
            <TouchableOpacity
              style={[styles.inputContainer, styles.pickerContainer]}
              onPress={() => setShowPicker3(true)}
            >
              <Image
                source={require("./assets/topic.png")}
                style={styles.icon} />
              <Text style={styles.pickerText}>
                {topicOfInterest ? topicOfInterest : "Select your topic of interest"}
              </Text>
              <Image
                source={require("./assets/arrow.png")}
                style={styles.icon} />
            </TouchableOpacity>

            <Modal visible={showPicker3} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShowPicker3(false)}>

                  </TouchableOpacity>
                  <Text style={styles.modalHeaderText}>Select your topic</Text>
                  <View style={styles.modalHeaderRight}>
                    <TouchableOpacity onPress={() => setShowPicker3(false)}>
                      <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSubjectSelect()}>
                      <Text style={styles.modalHeaderButtonText}>Select</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={topicOfInterest}
                    onValueChange={(itemValue) => setTopicOfInterest(itemValue)}
                  >
                    {elementarySchoolSubjects.map((subject) => (
                      <Picker.Item key={subject} label={subject} value={subject} />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </>
        ) :studyLevel === "Middle School" ? (
          <>
            <TouchableOpacity
              style={[styles.inputContainer, styles.pickerContainer]}
              onPress={() => setShowPicker3(true)}
            >
              <Image
                source={require("./assets/topic.png")}
                style={styles.icon} />
              <Text style={styles.pickerText}>
                {topicOfInterest ? topicOfInterest : "Select your topic"}
              </Text>
              <Image
                source={require("./assets/arrow.png")}
                style={styles.icon} />
            </TouchableOpacity>

            <Modal visible={showPicker3} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShowPicker3(false)}>

                  </TouchableOpacity>
                  <Text style={styles.modalHeaderText}>Select your topic</Text>
                  <View style={styles.modalHeaderRight}>
                    <TouchableOpacity onPress={() => setShowPicker3(false)}>
                      <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSubjectSelect()}>
                      <Text style={styles.modalHeaderButtonText}>Select</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={topicOfInterest}
                    onValueChange={(itemValue) => setTopicOfInterest(itemValue)}
                  >
                    {middleSchoolSubjects.map((subject) => (
                      <Picker.Item key={subject} label={subject} value={subject} />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </>
        ) :studyLevel === "High School" ? (
          <>
            <TouchableOpacity
              style={[styles.inputContainer, styles.pickerContainer]}
              onPress={() => setShowPicker3(true)}
            >
              <Image
                source={require("./assets/topic.png")}
                style={styles.icon} />
              <Text style={styles.pickerText}>
                {topicOfInterest ? topicOfInterest : "Select your topic"}
              </Text>
              <Image
                source={require("./assets/arrow.png")}
                style={styles.icon} />
            </TouchableOpacity>

            <Modal visible={showPicker3} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShowPicker3(false)}>

                  </TouchableOpacity>
                  <Text style={styles.modalHeaderText}>Select your topic</Text>
                  <View style={styles.modalHeaderRight}>
                    <TouchableOpacity onPress={() => setShowPicker3(false)}>
                      <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSubjectSelect()}>
                      <Text style={styles.modalHeaderButtonText}>Select</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={topicOfInterest}
                    onValueChange={(itemValue) => setTopicOfInterest(itemValue)}
                  >
                    {highSchoolSubjects.map((subject) => (
                      <Picker.Item key={subject} label={subject} value={subject} />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </>
        ) :studyLevel === "College" ? (
          <>
            <TouchableOpacity
              style={[styles.inputContainer, styles.pickerContainer]}
              onPress={() => setShowPicker3(true)}
            >
              <Image
                source={require("./assets/topic.png")}
                style={styles.icon} />
              <Text style={styles.pickerText}>
                {topicOfInterest ? topicOfInterest : "Select your topic"}
              </Text>
              <Image
                source={require("./assets/arrow.png")}
                style={styles.icon} />
            </TouchableOpacity>

            <Modal visible={showPicker3} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShowPicker3(false)}>

                  </TouchableOpacity>
                  <Text style={styles.modalHeaderText}>Select your topic</Text>
                  <View style={styles.modalHeaderRight}>
                    <TouchableOpacity onPress={() => setShowPicker3(false)}>
                      <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSubjectSelect()}>
                      <Text style={styles.modalHeaderButtonText}>Select</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={topicOfInterest}
                    onValueChange={(itemValue) => setTopicOfInterest(itemValue)}
                  >
                    {collegeSubjects.map((subject) => (
                      <Picker.Item key={subject} label={subject} value={subject} />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </>
        ) :
         null}
      </View>
    </View>
    {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0bdc9f" />
        </View>
      )}
    <View>
        <TouchableOpacity onPress={handleSubmit} style={styles.customLogIn}>
          <Text style={styles.text2}>NEXT</Text>
        </TouchableOpacity>
      </View></>
      
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center'
  },

  subContainer: {
    backgroundColor: "white",
    height: 120,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 55,
    borderTopWidth: 0,
    padding: 20,
    paddingTop: 30,
  },

  welcome: {
    color: "black",
    fontSize: 45,
    fontWeight: "bold",
    fontStyle: "normal",
  },

  subContainerB: {
    backgroundColor: "white",
    height: 350,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    // justifyContent: 'center',
    borderWidth: 5,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 55,
    borderTopWidth: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    marginTop: 40,
    paddingBottom: 40,
    //flexDirection: 'row',
    marginLeft: 35,
    marginRight: 35,
  },

  inputContainer: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    width: "100%",
    height: 50,
  },

  input: {
    flex: 1,
    height: 40,
    //margin: 10
    //backgroundColor: 'green'
  },

  innerContainer: {
    marginTop: 47,
    height: "50%",
    justifyContent: "center",
    //width: 300
  },

  subtitle: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    width: 20,
    marginBottom: 0,
    //fontWeight: 'bold',
  },

  customLogIn: {
    backgroundColor: "#3C4142",
    borderRadius: 10,
    padding: 8,
    width: "34%",
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    height: 50,
    marginBottom: 120,
    
  },
  icon: {
    marginRight: 10,
    height: 15,
    width: 15,
  },
  text: {
    color: "#0bdc9f",
    fontSize: 11,
    fontWeight: "bold",
    padding: 5,
  },
  text2: {
    color: "#0bdc9f",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  picker: {
    flex: 1,
    width: "100%",
   // or whatever height you prefer
}
,  
containerload: {
flex: 1,
backgroundColor: 'black',
// other styles as needed
},
modalContainer: {
flex: 1, 
justifyContent: 'center',
backgroundColor: '#808080',
padding: 20,
},

overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
},
modalHeader: {
  backgroundColor: "#eee",
  height: 60,

  alignItems: "center",
  flexDirection: "row",
  paddingLeft: 7,
  paddingRight: 3,
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
},


modalHeaderText: {
fontSize: 20,
fontWeight: "bold",
textAlign: "center",
flex: 1,
},

modalHeaderRight: {
flexDirection: "row",
},

modalHeaderButtonText: {
fontSize: 16,
marginLeft: 10,
marginRight: 10,
color: "#0DA57A",
},

pickerText: {
flex: 1,
fontSize: 16,
color: "#555",
},
pickerContainer: {
  backgroundColor: "white",
  marginTop: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
  marginLeft: 20,
  marginRight: 20,
}
});

export default LoginScreen;