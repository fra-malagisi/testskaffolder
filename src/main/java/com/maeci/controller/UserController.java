package com.maeci.controller;

import org.springframework.context.annotation.PropertySource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import com.maeci.db.maeci_db.entity.User;
import com.maeci.db.maeci_db.service.UserService;


@RestController
@PropertySource("classpath:${configfile.path}/Manage_Film_Example.properties")
@RequestMapping(value="${endpoint.api}/Users", headers = "Accept=application/json")
public class UserController {

	@Autowired
	private UserService userService;
	
	//CRUD - CREATE
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(method = RequestMethod.POST)
	public User insert(@RequestBody User obj){
		return userService.insert(obj);
	}
	
	//CRUD - REMOVE
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") String id) {
		userService.delete(id);
	}
	
    //CRUD - GET ONE
    @Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public User get(@PathVariable String id)  {
		return userService.get(id);
	}
	
    //CRUD - GET LIST
    @Secured({"ROLE_ADMIN"})
	@RequestMapping(method = RequestMethod.GET)
	public List<User> getList() {
		return userService.getList();
	}
	
    //CRUD - EDIT
    @Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public User update(@RequestBody User obj) {
		return userService.update(obj);
	}
	
	//CHANGE PASSWORD
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/{id}/changePassword", method = RequestMethod.POST)
	public HashMap<String, String> changePassword(@PathVariable("id") String id,@RequestBody Map<String, String> passwords) throws Exception {
		boolean check = userService.changePassword(id, passwords.get("passwordAdmin"), passwords.get("passwordNew"));
		if(check)
			return new HashMap<String,String>();
		else
			return null;
	}
	/*
	 * CUSTOM SERVICES
	 * 
	 */
}
