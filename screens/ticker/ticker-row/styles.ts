import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    marginTop: 15,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  keyView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  valueView: {
    width: 200
  },
  name: {
    fontSize: 16
  }
});
