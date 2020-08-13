import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const width = Dimensions.get('screen').width;
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showSpinner: false,
    };
  }
  componentDidMount = () => {
    this.hitServiceToGetUser();
  };
  hitServiceToGetUser = async () => {
    this.setState({showSpinner: true});
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log(response);
        this.setState({data: response.data, showSpinner: false});
      })
      .catch((err) => {
        this.setState({showSpinner: false});
        console.log(err.response);
        throw err;
      });
  };
  deletedataElement = async (index) => {
    console.log(index);
    let myData = [...this.state.data];
    myData.splice(index, 1);
    this.setState({
      data: myData,
    });
  };
  render() {
    console.log(this.state.data);

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Spinner visible={this.state.showSpinner} />
        <StatusBar backgroundColor="rgb(255,255,255)" barStyle="dark-content" />
        <SafeAreaView style={{backgroundColor: '#fff'}}></SafeAreaView>
        <View style={{marginTop: 7}}>
          <ScrollView>
            {this.state.data.map((item, index) => {
              return (
                <View key={index}>
                  {index % 2 == 0 ? (
                    <View style={{alignItems: 'flex-end'}}>
                      <View style={{...styles.mainView}}>
                        <View style={styles.Viewstyle}>
                          <View>
                            <Text style={{fontSize: 12, fontWeight: '400'}}>
                              Name: {item.name}
                            </Text>
                            <Text style={styles.textStyle}>
                              Email: {item.email}
                            </Text>
                            <Text style={styles.textStyle}>
                              {item.address.suite} {item.address.street}{' '}
                              {item.address.city} {item.address.zipcode}
                            </Text>
                            <Text style={styles.textStyle}>
                              Phone: {item.phone}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.websiteView}>
                          <Text style={styles.websitestyle}>
                            {item.website}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={styles.imageToch}
                          onPress={() => {
                            this.deletedataElement(index);
                          }}>
                          <Image
                            style={{height: 18, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/remove.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={{...styles.mainView}}>
                      <View style={styles.Viewstyle}>
                        <View>
                          <Text style={{fontSize: 12, fontWeight: '400'}}>
                            Name: {item.name}
                          </Text>
                          <Text style={styles.textStyle}>
                            Email: {item.email}
                          </Text>
                          <Text style={styles.textStyle}>
                            {item.address.suite} {item.address.street}{' '}
                            {item.address.city} {item.address.zipcode}
                          </Text>
                          <Text style={styles.textStyle}>
                            Phone: {item.phone}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.websiteView}>
                        <Text style={styles.websitestyle}>{item.website}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.imageToch}
                        onPress={() => {
                          this.deletedataElement(index);
                        }}>
                        <Image
                          style={{height: 18, width: 20}}
                          resizeMode="contain"
                          source={require('../../assets/remove.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    marginTop: 7,
    marginBottom: 3,
    width: width / 1.11,
    borderRadius: 14,
    backgroundColor: 'rgb(229,229,229)',
    justifyContent: 'space-between',
    borderColor: 'rgb(10,10,10)',
    borderWidth: 1,
  },
  websitestyle: {
    fontSize: 16,
    marginTop: 8,
    color: 'rgb(10,10,10)',
    textDecorationLine: 'underline',
  },
  textStyle: {
    fontSize: 12,
    marginTop: 8,
    color: 'rgb(60,60,60)',
  },
  Viewstyle: {
    marginLeft: 12,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  websiteView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  imageToch: {
    right: 10,
    marginTop: 5,
    height: 30,
    width: 30,
    position: 'absolute',
  },
});
export default Users;
