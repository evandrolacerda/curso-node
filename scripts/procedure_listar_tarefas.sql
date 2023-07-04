CREATE PROCEDURE listar_tarefas_por_status @status bit
AS
BEGIN
	SELECT * FROM tarefas WHERE executada = @status
END

	
