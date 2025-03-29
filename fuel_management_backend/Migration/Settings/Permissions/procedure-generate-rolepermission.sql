CREATE PROCEDURE SETTINGS_PERMISSIONS_generate_role_based_permission(roleid INT)
LANGUAGE plpgsql
AS $$
BEGIN
     WITH selected_role AS (
        SELECT 
            id
        FROM roles 
        WHERE id = roleid
        LIMIT 1
    ),
    modules_based_permission AS (
        SELECT 
            *,
            (SELECT id FROM selected_role) AS roleid
        FROM modules 
        WHERE parentmoduleid IS NOT NULL
    )
    INSERT INTO rolepermissions(roleid, moduleid)
    SELECT
        roleid, id
    FROM modules_based_permission;
END;
$$;

