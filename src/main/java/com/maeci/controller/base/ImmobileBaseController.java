package com.maeci.controller.base;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.bson.types.ObjectId;
import org.springframework.security.access.annotation.Secured;
import org.springframework.beans.factory.annotation.Autowired;
import com.maeci.db.maeci_db.service.ImmobileService;
import com.maeci.db.maeci_db.entity.Immobile;

//IMPORT RELATIONS

public class ImmobileBaseController {
    
    @Autowired
	ImmobileService immobileService;



//CRUD METHODS


    //CRUD - CREATE
    @Secured({ "ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles",method = RequestMethod.POST, headers = "Accept=application/json")
	public Immobile insert(@RequestBody Immobile obj) {
		 return immobileService.insert(obj);
	}

	
    //CRUD - REMOVE
    @Secured({ "ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	public void delete(@PathVariable("id") String id) {
		immobileService.delete(id);
	}
	
	
    //CRUD - GET ONE
    @Secured({ "ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles/{id}", method = RequestMethod.GET, headers = "Accept=application/json")
	public Immobile get(@PathVariable String id) {
		return immobileService.get(id);
	}
	
	
    //CRUD - GET LIST
    @Secured({ "ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles", method = RequestMethod.GET, headers = "Accept=application/json")
	public List<Immobile> getList() {
		return immobileService.getList();
	}
	
	

    //CRUD - EDIT
    @Secured({ "ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles/{id}", method = RequestMethod.POST, headers = "Accept=application/json")
	public Immobile update(@RequestBody Immobile obj) {
		return immobileService.update(obj);
	}
	


/*
 * CUSTOM SERVICES
 * 
 *	These services will be overwritten and implemented in  Custom.js
 */


	
}
