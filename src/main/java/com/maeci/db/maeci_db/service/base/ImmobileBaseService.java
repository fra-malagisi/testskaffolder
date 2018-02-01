package com.maeci.db.maeci_db.service.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Service;

import com.maeci.db.maeci_db.mapper.Immobile;
import com.maeci.db.maeci_db.service.ImmobileService;

@Service
public class ImmobileBaseService {

	private static NamedParameterJdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource dataSource) {
		jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}


    //CRUD METHODS
    
    
    //CRUD - CREATE
    	
	public Immobile insert(Immobile obj) {
		
		long id = jdbcTemplate.queryForObject("SELECT nvl(max(\"id\")+1, 1) FROM Immobile", new MapSqlParameterSource(), Long.class);
		obj.set_id(id);
		
		String sql = "INSERT INTO Immobile (\"id\", \"nome\"  )	VALUES (:id, :nome  )";

		SqlParameterSource parameters = new MapSqlParameterSource()
			.addValue("id", id)
			.addValue("nome", obj.getNome());

		jdbcTemplate.update(sql, parameters);
	    return obj;
	}
	
    	
        	
    //CRUD - REMOVE
    
	public void delete(Long id) {
		String sql = "DELETE FROM Immobile WHERE \"id\"=:id";
		SqlParameterSource parameters = new MapSqlParameterSource()
			.addValue("id", id);
		
		jdbcTemplate.update(sql, parameters);
	}

    	
        	
    //CRUD - GET ONE
    	
	public Immobile get(Long id) {
	    
		String sql = "select * from Immobile where \"id\" = :id";
		
	    SqlParameterSource parameters = new MapSqlParameterSource()
			.addValue("id", id);
	    
	    return jdbcTemplate.queryForObject(sql, parameters, new Immobile());
	}

    	
        	
    //CRUD - GET LIST
    	
	public List<Immobile> getList() {
	    
		String sql = "select * from Immobile";
		
	    SqlParameterSource parameters = new MapSqlParameterSource();
	    return jdbcTemplate.query(sql, parameters, new Immobile());
	}

    	
        
    //CRUD - EDIT
    	
	public Immobile update(Immobile obj, Long id) {

		String sql = "UPDATE Immobile SET \"nome\" = :nome  WHERE \"id\"=:id";

		SqlParameterSource parameters = new MapSqlParameterSource()
			.addValue("id", id)
			.addValue("nome", obj.getNome());

		jdbcTemplate.update(sql, parameters);
	    return obj;
	}
	
    	
    
    

    
    /*
     * CUSTOM SERVICES
     * 
     *	These services will be overwritten and implemented in  Custom.js
     */
    


}
