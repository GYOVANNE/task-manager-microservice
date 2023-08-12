package br.com.taskmanager.domains.Task.Adatpters;

import br.com.taskmanager.Repositories.Task.TaskEntity;
import br.com.taskmanager.Repositories.Task.TaskRepository;
import br.com.taskmanager.domains.Task.Entity.Task;
import br.com.taskmanager.domains.Task.Ports.Out.ITaskOutputPort;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TaskAdapterOut implements ITaskOutputPort {
    private final TaskRepository repository;

    public TaskAdapterOut(TaskRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Task> index() {
        List<TaskEntity> entity = this.repository.findAll();
        return entity.stream().map(TaskEntity::toTask).collect(Collectors.toList());
    }

    @Override
    public void create(Task request) {
        TaskEntity entity = new TaskEntity(request);
        this.repository.save(entity);
    }

    @Override
    public Task show(Long id) {
        TaskEntity entity = this.repository.getOne(id);
        return entity.toTask();
    }

    @Override
    public void update(Long id, Task request) {
        this.repository.findById(id).map(t -> {
            t.setName(request.getName());
            t.setDescription((request.getDescription()));
            t.setUpdated_at(new Date());
            return repository.save(t);
        });
    }

    @Override
    public void delete(Long id) {
        this.repository.deleteById(id);
    }
}
