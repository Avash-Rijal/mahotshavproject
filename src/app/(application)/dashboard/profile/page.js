import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import UserForm from "../Components/UserForm";

const page = () => {
  return (
    <div className="flex bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 bg-gray-50">
          <UserForm />
        </main>
      </div>
    </div>
  );
};

export default page;
