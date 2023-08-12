package br.com.taskmanager.domains.Task.Adatpters;

import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.DTO.TaskDTO;
import br.com.taskmanager.domains.Task.Entity.Task;
import br.com.taskmanager.domains.Task.Ports.In.ITaskInputPort;
import br.com.taskmanager.domains.Task.Ports.Out.ITaskOutputPort;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class TaskAdapter implements ITaskInputPort {
    @Autowired
    private final ITaskOutputPort output;

    public TaskAdapter(ITaskOutputPort output) {
        this.output = output;
    }

    @Override
    public List<TaskDTO> index() {
        return this.output.index().stream().map((task->{
            TaskDTO taskDto = new TaskDTO();
            taskDto.setId(task.getId());
            taskDto.setName(task.getName());
            taskDto.setDescription(task.getDescription());
            taskDto.setCreated_at(task.getCreated_at());
            taskDto.setUpdated_at(task.getUpdated_at());
            return taskDto;
        })).collect(Collectors.toList());
    }

    @Override
    public void create(CreateTaskRequestDTO request) {
        Task task = new Task(request);
        this.output.create(task);
    }

    @Override
    public TaskDTO show(Long id) {
        return this.output.show(id).toTaskDTO();
    }

    @Override
    public void update(Long id, CreateTaskRequestDTO request) {
        Task task = new Task(request);
        this.output.update(id, task);
    }

    @Override
    public void delete(Long id) {
        this.output.delete(id);
    }
}
