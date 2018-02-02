package com.maeci.db.maeci_db.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maeci.db.maeci_db.entity.User;

@Service
public class UserService {
	
	@Autowired
	private Datastore datastore;
	
	@Autowired
	private SecurityService securityService;
	
	public User login(String username, String password) {
	    return null;
	}
	
	//CRUD - CREATE
	public User insert(User obj) {
		datastore.save(obj);
		return obj;
	}
	
    
    //CRUD - GET ONE
	public User get(String id) {
		return datastore.find(User.class).field("_id").equal(new ObjectId(id)).get();
	}
   
    
    //CRUD - GET LIST
	public List<User> getList() {
		return  datastore.find(User.class).asList();
	}
        	
        
    //CRUD - EDIT
	public User update(User obj) {
		datastore.save(obj);
		return obj;
	}
	
	
    //CRUD - REMOVE
	public void delete(String id) {
		Query<User> query = datastore.createQuery(User.class).field("_id").equal(new ObjectId(id));
		datastore.delete(query);
	}


	public void changePassword(ObjectId id_user, Map<String, String> params) throws Exception {
		return;
	}
	

	// UTILS FUNCTION

	public void updatePassword(ObjectId id_user, String password) {
	    return;
	}
	
    public User addRoles(User user) {
        return null;
	}

	public void updateRoles(Long id_user, ArrayList<String> roles) {
        return;
	}
	
	public int countUsers() {
		return (int)datastore.createQuery(User.class).count();
	}
	
	public void newUser() {
		User user = new User();
		user.setUsername("admin");
        user.setPassword("1a1dc91c907325c69271ddf0c944bc72");
		List<String> roles = new ArrayList<>();
		roles.add("ADMIN");
		user.setRoles(roles);
		insert(user);
	}
	
	public boolean changePassword(String id, String passwordAdmin, String passwordNew) throws Exception {
		User admin = securityService.findUserByUsername("admin");
		User user = get(id);
		if(admin == null)
			return false;
		if(user == null)
			return false;
		if(admin.getPassword().equals(passwordAdmin)) {
			user.setPassword(passwordNew);
			update(user);
			return true;
		}
		return false;
	}
}