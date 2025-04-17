import { useEffect } from "react";
import AdminForm from "../../components/admin-form/admin-form.component"


const AdminPage = () => {

    useEffect(() => {
      document.title = "Admin Page";
    }, []);

    return(
        <div className="container">
            <h1 className="my-3">Admin</h1>
            <AdminForm />
        </div>
    )
}

export default AdminPage