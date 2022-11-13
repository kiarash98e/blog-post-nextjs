const Profile = (props) => {
    return (
        <div>
            {props.username}
        </div>
    );
}

export async function getServerSideProps (context) {
   const { params, res, req} = context
   const id = params.uid 
   return {
    props:{
        username:"user : " + id
    }
   }
}

export default Profile
