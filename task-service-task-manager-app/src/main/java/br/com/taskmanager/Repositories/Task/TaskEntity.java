package br.com.taskmanager.Repositories.Task;

import br.com.taskmanager.domains.Task.Entity.Task;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;


@Entity
@Table(name = "tasks")
public class TaskEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "task_id_seq")
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String description;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date created_at;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;


    @PrePersist
    private void onCreate() {
        created_at = new Date();
        updated_at = new Date();
    }

    public TaskEntity() {
    }

    public TaskEntity(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.description = task.getDescription();
        this.created_at = task.getCreated_at();
        this.updated_at = task.getUpdated_at();
    }

    public void update(Task task) {
        this.name = task.getName();
        this.description = task.getDescription();
    }

    public Task toTask() {
        return new Task(this.id, this.name,this.description, this.created_at, this.updated_at);
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
