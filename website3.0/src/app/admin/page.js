import AdminPanel from "@pages/AdminPanel"

function pages() {
  const authKey = process.env.DB_KEY;
  return (
    <div>
      <AdminPanel authKey = {authKey} />
    </div>
  )
}

export default pages
