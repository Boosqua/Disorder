export default function serverMembersUtils(servers, users){

   const server_members = {}
   for( const id in servers){
      server_members[id] = servers[id].members.map( id => users[id])
      server_members[id].sort(function (a, b) {
         var nameA = a.username.toUpperCase(); // ignore upper and lowercase
         var nameB = b.username.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
            return -1;
         }
         if (nameA > nameB) {
            return 1;
         }

         // names must be equal
         return 0;
      });
   }

   return server_members
}