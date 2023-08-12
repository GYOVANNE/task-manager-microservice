package br.com.taskmanager.domains.Task.Entity;

import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.DTO.TaskDTO;

import java.util.Date;

public class Task {

    private Long id;
    private String name;
    private String description;
    private Date created_at;
    private Date updated_at;

    public Task() {
    }

    public Task(CreateTaskRequestDTO request) {
        this.name = request.getName();
        this.description = request.getDescription();
    }

    public Task(TaskDTO request) {
        this.id = request.getId();
        this.name = request.getName();
        this.description = request.getDescription();
        this.created_at = request.getCreated_at();
        this.updated_at = request.getUpdated_at();
    }

    public TaskDTO toTaskDTO() {
        return new TaskDTO(this.id,this.name,this.description,this.created_at,this.updated_at);
    }

    public Task(Long id, String name, String description, Date created_at, Date updated_at) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Task(String name, String description, Date created_at, Date updated_at) {
        this.name = name;
        this.description = description;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }




}
