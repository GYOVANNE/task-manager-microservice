package br.com.taskmanager.Util;

public class ResponseSuccess {

    private String message;
    private StatusType statusType;

    public ResponseSuccess(String message) {
        this.message = message;
    }

    public ResponseSuccess(StatusType statusType) {
        switch (statusType) {
            case CREATED:
                this.message = "Registro criado com sucesso";
                this.statusType = StatusType.CREATED;
                break;
            case UPDATED:
                this.message = "Registro atualizado com sucesso";
                this.statusType = StatusType.UPDATED;
                break;
            case DELETED:
                this.message = "Registro deletado com sucesso";
                this.statusType = StatusType.DELETED;
                break;
            case INACTIVATED:
                this.message = "Registro inativado com sucesso";
                this.statusType = StatusType.INACTIVATED;
                break;
            default:
                this.message = "Registro salvo com sucesso";
                this.statusType = StatusType.SAVED;
                break;
        }
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public StatusType getStatusType() {
        return statusType;
    }

    public void setStatusType(StatusType statusType) {
        this.statusType = statusType;
    }

}
