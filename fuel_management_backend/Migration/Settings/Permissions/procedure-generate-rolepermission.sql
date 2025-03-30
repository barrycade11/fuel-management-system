CREATE PROCEDURE SETTINGS_PERMISSIONS_generate_role_based_permission(paramRoleid INT, createdby TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if conflicting role permissions already exist
    IF EXISTS (
        SELECT 1
        FROM rolepermissions
        WHERE roleid = paramRoleId
    ) THEN
        RAISE EXCEPTION 'Permission already created...';
    END IF;

    -- CTE for selecting the role
    WITH selected_role AS (
        SELECT 
            id
        FROM roles 
        WHERE id = paramRoleId
        LIMIT 1
    ),
    modules_based_permission AS (
        SELECT 
            *,
            (SELECT id FROM selected_role) AS roleid
        FROM modules 
        WHERE parentmoduleid IS NOT NULL
    )
    -- Insert new permissions if they do not already exist
    INSERT INTO rolepermissions(roleid, moduleid, createdby)
    SELECT
        roleid, id, createdby
    FROM modules_based_permission
    WHERE NOT EXISTS (
        SELECT 1 
        FROM rolepermissions 
        WHERE rolepermissions.roleid = paramRoleId
        AND rolepermissions.moduleid = modules_based_permission.id
    );
END;
$$;

