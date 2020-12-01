import {connect} from 'react-redux';
import Splash from './splash'

const mapStateToProps = (state) =>({
   currentUserId: state.session.currentUserId
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Splash)