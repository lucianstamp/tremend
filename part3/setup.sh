#!/bin/bash

container_name="postgresqlcontainer"
db_name="company_db"
db_user="ituser"
db_password="parola"
sql_script="/tmp/populated.sql"
admin="admin_cee"
admin_password="parolaadmin"
log_file="query_results.log"

docker cp populatedb.sql $container_name:$sql_script
docker exec $container_name psql -U $db_user -d $db_name -f $sql_script

docker exec $container_name psql -U $db_user -d $db_name -c "CREATE ROLE $admin WITH LOGIN PASSWORD '$admin_password';"
docker exec $container_name psql -U $db_user -d $db_name -c "ALTER ROLE $admin WITH SUPERUSER;"

echo "Total Employees:" > $log_file
docker exec $container_name psql -U $db_user -d $db_name -c "SELECT COUNT(*) AS total_employees FROM employees;" >> $log_file

# Prompt the user to enter a department name
read -p "Enter the department name: " department

echo -e "\nEmployees in $department Department:" >> $log_file
docker exec $container_name psql -U $db_user -d $db_name -c "
SELECT e.first_name, e.last_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE d.department_name = '$department';" >> $log_file

echo -e "\nHighest and Lowest Salaries per Department:" >> $log_file
docker exec $container_name psql -U $db_user -d $db_name -c "
SELECT 
    d.department_name,
    MAX(s.salary) AS highest_salary,
    MIN(s.salary) AS lowest_salary
FROM 
    employees e
JOIN 
    salaries s ON e.employee_id = s.employee_id
JOIN 
    departments d ON e.department_id = d.department_id
GROUP BY 
    d.department_name;" >> $log_file
