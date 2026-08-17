const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware to authorize workspace access based on WorkspaceMember roles
 * @param  {...string} allowedRoles - e.g., 'OWNER', 'DEVELOPER', 'VIEWER'
 */
const authorizeWorkspaceRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Assuming authMiddleware has already run and attached req.user
      if (!req.user || !req.user.id) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      const userId = req.user.id;
      
      // Determine workspaceId from various possible request locations
      const workspaceId = 
        req.params.workspaceId || 
        req.body.workspaceId || 
        req.query.workspaceId ||
        req.params.id; // Fallback if route is /api/workspaces/:id

      if (!workspaceId) {
        return res.status(400).json({ msg: "Workspace ID is required for authorization" });
      }

      // Check if user is the direct owner of the workspace (Safety fallback)
      const workspace = await prisma.workspace.findUnique({
        where: { id: workspaceId },
        select: { ownerId: true }
      });

      if (!workspace) {
        return res.status(404).json({ msg: "Workspace not found" });
      }

      // If the user is the owner, they automatically have OWNER privileges
      if (workspace.ownerId === userId && allowedRoles.includes('OWNER')) {
        return next();
      }

      // Query the WorkspaceMember table for the user's specific role in this workspace
      const member = await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: {
            workspaceId: workspaceId,
            userId: userId
          }
        }
      });

      if (!member) {
        return res.status(403).json({ msg: "Access denied: Not a member of this workspace" });
      }

      if (!allowedRoles.includes(member.role)) {
        return res.status(403).json({ 
          msg: `Access denied: Requires one of [${allowedRoles.join(', ')}], but got ${member.role}` 
        });
      }

      // Attach member object to request for downstream use if needed
      req.workspaceMember = member;
      next();
      
    } catch (error) {
      console.error("Workspace Authorization Error:", error);
      res.status(500).json({ msg: "Internal server error during authorization" });
    }
  };
};

module.exports = authorizeWorkspaceRole;
