import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

const createItem = async ({ title, task }) => {
    try{
        const { data } = await supabase
          .from("todoDB")
          .insert([{ title: title, task: task }])
          .select();
        return data;
    } catch(err){
        return err;
    }
};

const listItems = async() => {
    try{
        let { data: todoDB } = await supabase
            .from('todoDB')
            .select('id,title,task')
        return todoDB;
    } catch(err){
        return err
    }
}

const getItemById = async(value) => {
    try{
        let { data: todoDB } = await supabase
            .from('todoDB')
            .select("*")
            .eq("id", value)
        return todoDB;
    }catch(err){
        return err;
    }
}

const updateItemById = async(value, {title, task}) => {
    try{
        const { data } = await supabase
          .from("todoDB")
          .update({ title: title, task: task })
          .eq("id", value)
          .select();
          return data
    }catch(err){
        return err
    }
}

const deleteItembyId = async(value) => {
    try{
        const { error } = await supabase
            .from('todoDB')
            .delete()
            .eq('id', value)
            if (error) return error
        return "success";
    }catch(err){
        return err
    }
}

const createUser = async ({ username, email, password }) => {
  try {
    const { data, error } = await supabase
      .from("authDB")
      .insert([{ username:username, email: email, password: password }])
      .select();
    if (error) return error;
    localStorage.setItem('name', JSON.stringify(data[0].username))
    return data;
  } catch (err) {
    return err;
  }
};

const checkUser = async(username, password) => {
    try{
        let { data: authDB, error } = await supabase
          .from("authDB")
          .select("*")
          .eq("username", username)
          .eq("password", password)
        if(error) return error
    localStorage.setItem("name", JSON.stringify(authDB[0].username));
    return authDB
    } catch(err){
        return err
    }
}

const checkEmailExist = async(email) => {
    try{
        let { data: authDB } = await supabase
          .from("authDB")
          .select("*")
          .eq("email", email)
        return authDB
    }catch(err){
        return err
    }
}

export {
  createItem,
  listItems,
  getItemById,
  updateItemById,
  deleteItembyId,
  createUser,
  checkUser,
  checkEmailExist,
};
